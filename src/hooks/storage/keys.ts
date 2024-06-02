// Define the keys as an enum
export enum StorageKeys {
  StoryTelling = 'story_telling',
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

interface StoryTellingType {
  viewed: boolean;
}

// Add types for other keys if needed
// interface OtherKeyType { ... }

// Map keys to their corresponding types
export type StorageValues = {
  [StorageKeys.RememberMe]: RememberMeType;
  [StorageKeys.AccessToken]: AccessToken;
  [StorageKeys.StoryTelling]: StoryTellingType;
  // Add other key-value mappings here
};
