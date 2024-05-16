// Define the keys as an enum
export enum StorageKeys {
  RememberMe = 'remember_me',
  AccessToken = 'access_token',
  // Add other keys here
}

// Define the type for each storage key
interface RememberMeType {
  email: string;
  password: string;
  deviceId: string;
  pushKey: string | null;
}

interface AccessToken {
  accessToken: string;
  refreshToken: string;
}

// Add types for other keys if needed
// interface OtherKeyType { ... }

// Map keys to their corresponding types
export type StorageValues = {
  [StorageKeys.RememberMe]: RememberMeType;
  [StorageKeys.AccessToken]: AccessToken;
  // Add other key-value mappings here
};
