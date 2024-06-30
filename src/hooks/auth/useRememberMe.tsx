import LoginRemember from '@components/page/login/remember';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import { StorageKeys } from '@hooks/storage/keys';
import useAsyncStorage from '@hooks/storage/useAsyncStorage';

//TODO: 나중에 useRememberMe hook으로 리팩토링
const useRememberMe = () => {
  const {
    storedValue: rememberMe,
    setValue: setRememberMe,
    removeValue: removeRememberMe,
  } = useAsyncStorage<StorageKeys.RememberMe>(StorageKeys.RememberMe);

  const showBottomSheet = ({
    onClose,
    onRemember,
  }: {
    onClose: () => void;
    onRemember: () => void;
  }) => {
    BottomSheet.show({
      component: <LoginRemember onClose={onClose} onRemember={onRemember} />,
    });
  };

  return {
    showBottomSheet,
  };
};

export default useRememberMe;
