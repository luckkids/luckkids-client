import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '@hooks/storage/keys';

export const getAccessToken = async (): Promise<string | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(StorageKeys.AccessToken);
    if (jsonValue != null) {
      const value = JSON.parse(jsonValue);
      return value.accessToken;
    }
    return null;
  } catch (e) {
    console.error('Error getting access token:', e);
    return null;
  }
};
