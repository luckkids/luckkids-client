import SafeStorage from './modules/storage.safe';

/**
 * 토큰 관리를 위한 storage
 */
export const accessTokenStorage = new SafeStorage<string>('accessToken');

/**
 * 자동 로그인 정보를 저장하는 storage
 */
export const rememberMeStorage = new SafeStorage<{
  email: string;
  password: string;
  deviceId: string;
  pushKey: string | null;
}>('rememberMe');


/**
 * 첫 설치 여부를 기록하는 storage
 */
export const firstInstallStorage = new SafeStorage<boolean>('firstInstall');
