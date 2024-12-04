import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from '@sentry/react-native';

type LogLevel = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';

interface DeviceInfo {
  platform: string;
  version: string | number;
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  extra: Record<string, unknown>;
  deviceInfo: DeviceInfo;
}

interface UserContext {
  id: string;
  email?: string;
  username?: string;
  [key: string]: unknown;
}

class Logger {
  private static instance: Logger | null = null;
  private static readonly STORAGE_KEY = '@app_logs';
  private static readonly MAX_LOGS = 1000;

  private logs: LogEntry[] = [];

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public async initialize(): Promise<void> {
    try {
      const savedLogs = await AsyncStorage.getItem(Logger.STORAGE_KEY);
      if (savedLogs) {
        this.logs = JSON.parse(savedLogs);
      }
    } catch (error) {
      console.error('Failed to load logs:', error);
      Sentry.captureException(error);
    }
  }

  private async log(
    level: LogLevel,
    message: string,
    extra: Record<string, unknown> = {},
  ): Promise<void> {
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      extra,
      deviceInfo: await this.getDeviceInfo(),
    };

    this.logs.unshift(logEntry);

    if (this.logs.length > Logger.MAX_LOGS) {
      this.logs = this.logs.slice(0, Logger.MAX_LOGS);
    }

    try {
      await AsyncStorage.setItem(Logger.STORAGE_KEY, JSON.stringify(this.logs));
      this.sendToSentry(level, message, extra);
    } catch (error) {
      console.error('Failed to save logs:', error);
      if (error instanceof Error) {
        Sentry.captureException(error);
      }
    }
  }

  private async getDeviceInfo(): Promise<DeviceInfo> {
    return {
      platform: Platform.OS,
      version: Platform.Version,
    };
  }

  private sendToSentry(
    level: LogLevel,
    message: string,
    extra: Record<string, unknown>,
  ): void {
    switch (level) {
      case 'ERROR':
        Sentry.captureException(new Error(message), {
          extra,
          level: 'error',
        });
        break;
      case 'WARN':
        Sentry.captureMessage(message, {
          extra,
          level: 'warning',
        });
        break;
      case 'INFO':
        Sentry.captureMessage(message, {
          extra,
          level: 'info',
        });
        break;
      case 'DEBUG':
        Sentry.addBreadcrumb({
          category: 'debug',
          message,
          data: extra,
          level: 'debug',
        });
        break;
    }
  }

  public setCurrentScreen(screenName: string): void {
    Sentry.addBreadcrumb({
      category: 'navigation',
      message: `Navigated to ${screenName}`,
      data: { screen: screenName },
      level: 'info',
    });
  }

  public setUserContext(user: UserContext): void {
    Sentry.setUser(user);
  }

  public async getLogs(): Promise<LogEntry[]> {
    return this.logs;
  }

  public async clearLogs(): Promise<void> {
    this.logs = [];
    await AsyncStorage.setItem(Logger.STORAGE_KEY, JSON.stringify(this.logs));
  }

  public async debug(
    message: string,
    extra: Record<string, unknown> = {},
  ): Promise<void> {
    return this.log('DEBUG', message, extra);
  }

  public async info(
    message: string,
    extra: Record<string, unknown> = {},
  ): Promise<void> {
    return this.log('INFO', message, extra);
  }

  public async warn(
    message: string,
    extra: Record<string, unknown> = {},
  ): Promise<void> {
    return this.log('WARN', message, extra);
  }

  public async error(
    message: string,
    extra: Record<string, unknown> = {},
  ): Promise<void> {
    return this.log('ERROR', message, extra);
  }
}

// Sentry 초기화
Sentry.init({
  dsn: 'https://ed010e7afd501551df9947c459cd2129@o4508401213898752.ingest.us.sentry.io/4508408967659520',
  tracesSampleRate: 1.0,
  enableAutoSessionTracking: true,
  sessionTrackingIntervalMillis: 30000,
});

export default Logger.getInstance();
