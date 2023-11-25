import { MMKV } from 'react-native-mmkv';
import LuckKidsStorage from './storage.app';
import Storage from './storage.base';

class SafeUserStorage<
  T extends 'string' | 'number' | 'boolean' | 'object',
  V extends T extends 'string'
    ? string
    : T extends 'number'
      ? number
      : T extends 'boolean'
        ? boolean
        : Record<string, any>,
> extends Storage {
  private static storage: MMKV = LuckKidsStorage;

  public static clear() {
    SafeUserStorage.storage?.clearAll();
  }

  public static setUser(userId: number): void {
    SafeUserStorage.storage = new MMKV({
      id: `ct-user-${userId}-storage`,
      encryptionKey: 'hunter2',
    });

    console.log('[SafeUserStorage] init user with', userId);
  }

  public static removeUser(): void {
    SafeUserStorage.storage = LuckKidsStorage;
    console.log('[SafeUserStorage] use CtStorage');
  }

  private type: T;

  constructor(key: string, type: T) {
    super(key);
    this.type = type;
  }

  public getItem(): V | undefined {
    try {
      switch (this.type) {
        case 'boolean':
          return SafeUserStorage.storage.getBoolean(this.key) as V;
        case 'number':
          return SafeUserStorage.storage.getNumber(this.key) as V;
        case 'string':
          return SafeUserStorage.storage.getString(this.key) as V;
        case 'object': {
          const raw = SafeUserStorage.storage.getString(this.key);
          if (!raw) return undefined;
          return JSON.parse(raw) as V;
        }
        default:
          throw new Error('invalid data type');
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public setItem(value: V): void {
    try {
      if (typeof value === 'object') {
        if (value === null) {
          throw new Error('invalid value error object value expected');
        }
        return SafeUserStorage.storage.set(this.key, JSON.stringify(value));
      }
      SafeUserStorage.storage.set(this.key, value);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public removeItem(): void {
    try {
      return SafeUserStorage.storage.delete(this.key);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default SafeUserStorage;
