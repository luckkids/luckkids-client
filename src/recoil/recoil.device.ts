import DeviceInfo from 'react-native-device-info';
import { atom } from 'recoil';
import { IDevice } from '../types/recoil/types.recoil';

export const RecoilDevice = atom<IDevice>({
  key: 'recoil-device',
  default: {
    deviceId: null,
  },
  effects: [
    ({ setSelf }) => {
      const getDeviceId = async () => {
        const deviceId = await DeviceInfo.getUniqueId();
        setSelf({ deviceId });
      };
      getDeviceId();
    },
  ],
});
