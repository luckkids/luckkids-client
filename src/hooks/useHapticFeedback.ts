import { useCallback } from 'react';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const useHapticFeedback = () => {
  const haptic = useCallback(() => {
    ReactNativeHapticFeedback.trigger('impactLight', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });
  }, []);

  return {
    haptic,
  };
};

export default useHapticFeedback;
