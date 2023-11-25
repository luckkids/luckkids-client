import { MMKV } from 'react-native-mmkv';

const LuckKidsStorage = new MMKV({
  id: `luck-kids-storage`,
  encryptionKey: 'hunter2',
});

export default LuckKidsStorage;
