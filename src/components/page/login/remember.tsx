import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Font, L, SvgIcon } from '@design-system';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';

type LoginRememberProps = {
  onClose: () => void;
  onRemember: () => void;
};

const LoginRemember = ({ onClose, onRemember }: LoginRememberProps) => {
  const { bottom } = useSafeAreaInsets();

  const handleRemember = () => {
    BottomSheet.hide();
    onRemember();
  };

  const handleClose = () => {
    BottomSheet.hide();
    onClose();
  };

  return (
    <L.Col items="center" pt={70} ph={25} pb={bottom}>
      <SvgIcon name="icon_lock" size={64} />
      <Font textAlign="center" type="TITLE2_BOLD" mt={25}>
        {'다음부터\n자동으로 로그인할까요?'}
      </Font>
      <Font textAlign="center" type="BODY_REGULAR" mt={16} mb={40}>
        설정에서 언제든 변경할 수 있어요.
      </Font>
      <L.Col g={10} w="100%">
        <Button
          status={'normal'}
          bgColor={'LUCK_GREEN'}
          text={'네, 좋아요'}
          textColor="BLACK"
          onPress={handleRemember}
          type={'action'}
          sizing="stretch"
        />
        <Button
          status={'normal'}
          bgColor={'TRANSPARENT'}
          text={'다음에 할게요'}
          outline="LUCK_GREEN"
          textColor="LUCK_GREEN"
          onPress={handleClose}
          type={'action'}
          sizing="stretch"
        />
      </L.Col>
    </L.Col>
  );
};

export default LoginRemember;
