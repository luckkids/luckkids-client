import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRecoilValue } from 'recoil';
import { DEFAULT_MARGIN } from '@constants';
import { Button, Font, L, SvgIcon } from '@design-system';
import StackNavbar from '@components/common/StackNavBar/StackNavBar';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { useFetch } from '@hooks/useFetch';
import { RecoilJoinInfo } from '@recoil/recoil.join';

type AgreementContent = {
  text: string;
  isNecessary: boolean;
  url: string;
};

const AGREEMENT_CONTENT: AgreementContent[] = [
  {
    text: '럭키즈 이용약관 필수동의',
    isNecessary: true,
    url: 'https://naver.com',
  },
  {
    text: '개인정보 필수동의',
    isNecessary: true,
    url: 'https://naver.com',
  },
  {
    text: '마케팅 수신 동의 (선택)',
    isNecessary: false,
    url: 'https://naver.com',
  },
];

export const PageLoginJoinAgreement: React.FC = () => {
  const { bottom } = useSafeAreaInsets();
  const joinInfo = useRecoilValue(RecoilJoinInfo);

  const [agreementInfo, setAgreementInfo] = useState<
    (AgreementContent & { isChecked: boolean })[]
  >(
    AGREEMENT_CONTENT.map((c) => ({
      ...c,
      isChecked: c.isNecessary,
    })),
  );

  const navigation = useNavigationService();

  const handleToggleNecessary = () => {
    // 필수 항목 isChecked 토글
    setAgreementInfo((prev) =>
      prev.map((info) => ({
        ...info,
        isChecked: info.isNecessary ? !info.isChecked : info.isChecked,
      })),
    );
  };

  const handleToggleOptional = () => {
    // 선택 항목 isChecked 토글
    setAgreementInfo((prev) =>
      prev.map((info) => ({
        ...info,
        isChecked: !info.isNecessary ? !info.isChecked : info.isChecked,
      })),
    );
  };

  const isButtonDisabled = agreementInfo
    .filter((info) => info.isNecessary)
    .some((info) => !info.isChecked);

  const { onFetch: signUp } = useFetch({
    method: 'POST',
    url: '/join/user',
    value: {
      email: joinInfo.email,
      password: joinInfo.password,
    },
    onSuccessCallback: () => {
      navigation.navigate('LoginId');
    },
    onFailCallback: () => {
      navigation.navigate('LoginId');
    },
  });

  return (
    <FrameLayout>
      <StackNavbar useBackButton />
      <L.Col
        w={'100%'}
        h={'100%'}
        justify="space-between"
        items={'center'}
        ph={DEFAULT_MARGIN}
      >
        <L.Col w={'100%'} mt={36}>
          <Font type={'TITLE2_BOLD'}>아래 약관에 동의 후</Font>
          <Font type={'TITLE2_BOLD'}>럭키즈를 시작해보아요!</Font>
          <TouchableWithoutFeedback onPress={handleToggleNecessary}>
            <L.Row pv={14} g={14} items="center" mt={30}>
              <SvgIcon
                name={
                  agreementInfo
                    .filter((info) => info.isNecessary)
                    .every((info) => info.isChecked)
                    ? 'lucky_check'
                    : 'lucky_check_gray'
                }
                size={30}
              />
              <Font type={'HEADLINE_SEMIBOLD'}>필수 항목 모두 체크하기</Font>
            </L.Row>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={handleToggleOptional}>
            <L.Row pv={14} g={14} items="center">
              <SvgIcon
                name={
                  agreementInfo
                    .filter((info) => !info.isNecessary)
                    .every((info) => info.isChecked)
                    ? 'lucky_check'
                    : 'lucky_check_gray'
                }
                size={30}
              />
              <Font type={'HEADLINE_SEMIBOLD'}>선택 항목 모두 체크하기</Font>
            </L.Row>
          </TouchableWithoutFeedback>
        </L.Col>
        <L.Absolute b={DEFAULT_MARGIN + bottom} w={'100%'}>
          <L.Col w={'100%'}>
            <L.Col w={'100%'} mb={20}>
              {agreementInfo.map((info) => (
                <TouchableWithoutFeedback
                  key={info.text}
                  onPress={() => {
                    navigation.navigate('WebView', {
                      url: info.url,
                    });
                  }}
                >
                  <L.Row
                    justify="space-between"
                    w={'100%'}
                    pv={8}
                    ph={10}
                    items="center"
                  >
                    <L.Row g={14}>
                      <SvgIcon
                        name={
                          info.isChecked
                            ? 'validation_check'
                            : 'validation_check_gray'
                        }
                        size={20}
                      />
                      <Font type={'SUBHEADLINE_REGULAR'} color={'WHITE'}>
                        {info.text}
                      </Font>
                    </L.Row>
                    <SvgIcon name={'arrow_right_gray'} size={14} />
                  </L.Row>
                </TouchableWithoutFeedback>
              ))}
            </L.Col>
            <Button
              type={'action'}
              text={'동의했어요'}
              onPress={() => signUp}
              sizing="stretch"
              textColor="BLACK"
              bgColor={'LUCK_GREEN'}
              status={isButtonDisabled ? 'disabled' : 'normal'}
            />
          </L.Col>
        </L.Absolute>
      </L.Col>
    </FrameLayout>
  );
};
