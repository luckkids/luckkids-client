import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DEFAULT_MARGIN } from '@constants';
import { Button, Font, L } from '@design-system';
import { authApis } from '@apis/auth';
import StackNavBar from '@components/common/StackNavBar/StackNavBar';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';

const WITHDRAW_REASON_LIST = [
  '잘 사용하지 않는 앱이에요',
  '사용하기 어려워요',
  '알림이 너무 많이 와요',
  '오류가 생겼어요',
  '기타',
];

export const PageSettingAccount: React.FC = () => {
  const navigation = useNavigationService();
  const { bottom } = useSafeAreaInsets();
  const [reason, setReason] = useState<string>('');

  const handleConfirm = async () => {
    await authApis.registerWithdrawReason(reason);
    await authApis.deleteUser();

    return navigation.replace('LoginId');
  };

  return (
    <FrameLayout NavBar={<StackNavBar title={'탈퇴하기'} useBackButton />}>
      <L.Col ph={DEFAULT_MARGIN}>
        <L.Row mt={40} mb={18}>
          <Font type={'TITLE2_BOLD'} color="WHITE">
            탈퇴하는 이유가 무엇인가요?
          </Font>
        </L.Row>
        <L.Col>
          {WITHDRAW_REASON_LIST.map((item, i) => {
            return (
              <L.Row key={i} pv={20}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    setReason(item);
                  }}
                >
                  <Font
                    type={'BODY_REGULAR'}
                    color={reason === item ? 'LUCK_GREEN' : 'WHITE'}
                  >
                    {item}
                  </Font>
                </TouchableWithoutFeedback>
              </L.Row>
            );
          })}
        </L.Col>
      </L.Col>
      <L.Absolute b={bottom}>
        <L.Col g={10} w={'100%'} ph={25}>
          <L.Row w={'100%'}>
            <Button
              type={'action'}
              text={'제출'}
              bgColor={'LUCK_GREEN'}
              sizing={'stretch'}
              status={reason ? 'normal' : 'disabled'}
              onPress={handleConfirm}
            />
          </L.Row>
          <L.Row w={'100%'}>
            <Button
              type={'action'}
              text={'취소'}
              sizing={'stretch'}
              bgColor={'TRANSPARENT'}
              outline={'LUCK_GREEN'}
              textColor={'LUCK_GREEN'}
              onPress={() => navigation.goBack()}
            />
          </L.Row>
        </L.Col>
      </L.Absolute>
    </FrameLayout>
  );
};
