import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageValues } from './keys';

type UseAsyncStorage<K extends keyof StorageValues> = {
  storedValue: StorageValues[K] | null;
  setValue: (value: StorageValues[K] | null) => Promise<void>;
  removeValue: () => Promise<void>;
  loading: boolean;
};

// Custom hook to manage async storage with a given key and value as an object
const useAsyncStorage = <K extends keyof StorageValues>(
  key: K,
): UseAsyncStorage<K> => {
  const [storedValue, setStoredValue] = useState<StorageValues[K] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStoredValue = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(key);
        const value =
          jsonValue != null
            ? (JSON.parse(jsonValue) as StorageValues[K])
            : null;
        setStoredValue(value);
      } catch (e) {
        console.error(`Error loading value for key ${key}: `, e);
      } finally {
        setLoading(false);
      }
    };

    loadStoredValue();
  }, [key]);

  const setValue = async (value: StorageValues[K] | null) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      setStoredValue(value);
    } catch (e) {
      console.error(`Error setting value for key ${key}: `, e);
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem(key);
      setStoredValue(null);
    } catch (e) {
      console.error(`Error removing value for key ${key}: `, e);
    }
  };

  return {
    storedValue,
    setValue,
    removeValue,
    loading,
  };
};

export default useAsyncStorage;
