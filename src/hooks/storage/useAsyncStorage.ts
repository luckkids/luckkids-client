import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { defaultValues, StorageValues } from './keys';

const useAsyncStorage = <K extends keyof StorageValues>(
  key: K,
): UseAsyncStorage<K> => {
  const [storedValue, setStoredValue] = useState<StorageValues[K] | null>(null);
  const [loading, setLoading] = useState(true);

  // 현재 값을 직접 가져오는 함수 추가
  const getCurrentValue = async (): Promise<StorageValues[K] | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null
        ? (JSON.parse(jsonValue) as StorageValues[K])
        : null;
    } catch (e) {
      console.error(`Error getting current value for key ${key}: `, e);
      return null;
    }
  };

  useEffect(() => {
    const loadStoredValue = async () => {
      try {
        const value = await getCurrentValue();
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
    getCurrentValue, // 새로 추가된 함수 반환
  };
};

type UseAsyncStorage<K extends keyof StorageValues> = {
  storedValue: StorageValues[K] | null;
  setValue: (value: StorageValues[K] | null) => Promise<void>;
  removeValue: () => Promise<void>;
  loading: boolean;
  getCurrentValue: () => Promise<StorageValues[K] | null>; // 타입 정의 추가
};

export default useAsyncStorage;
