import { MMKV } from 'react-native-mmkv';

class MMKVFaker {
  private data: { [key: string]: any } = {};

  getString(key: string) {
    return this.data[key];
  }

  set(key: string, value: any) {
    this.data[key] = value;
  }

  delete(key: string) {
    delete this.data[key];
  }

  clearAll() {
    this.data = {};
  }
}

// Determining the storage mechanism based on whether it's a development environment
const mmkvStorage = __DEV__ ? new MMKVFaker() : new MMKV();

// Creating an instance of the storage with specific parameters
const LuckKidsStorage = (() => {
  if (mmkvStorage instanceof MMKV) {
    return new MMKV({
      id: 'luck-kids-storage',
      encryptionKey: 'hunter2'
    });
  } else {
    // Assuming MMKVFaker does not need specific parameters for creation
    return mmkvStorage; 
  }
})();

export default LuckKidsStorage;
