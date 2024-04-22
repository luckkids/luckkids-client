import SafeStorage from './modules/storage.safe';

/**
 * 토큰 관리를 위한 storage (자동 로그인)
 */
export const accessTokenStorage = new SafeStorage<string>('accessToken');



/**
 * 첫 설치 여부를 기록하는 storage
 */
export const firstInstallStorage = new SafeStorage<boolean>('firstInstall');
