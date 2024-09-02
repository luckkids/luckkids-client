import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRecoilValue } from 'recoil';
import { DEFAULT_MARGIN } from '@constants';
import { Button, Font, L, SvgIcon } from '@design-system';
import { authApis } from '@apis/auth';
import StackNavbar from '@components/common/StackNavBar/StackNavBar';
import { FrameLayout } from '@frame/frame.layout';
import LoadingIndicator from '@global-components/common/LoadingIndicator/LoadingIndicator';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { RecoilJoinInfo } from '@recoil/recoil.join';

type AgreementContent = {
  text: string;
  isNecessary: boolean;
  url: string;
  type: 'termUserAgreement' | 'personalInfoAgreement' | 'marketingAgreement';
};

const AGREEMENT_CONTENT: AgreementContent[] = [
  {
    text: '럭키즈 이용약관 필수동의',
    type: 'termUserAgreement',
    isNecessary: true,
    url: 'https://www.notion.so/1f210857eb944efcb575dc674249cda3?pvs=4',
  },
  {
    text: '개인정보 필수동의',
    type: 'personalInfoAgreement',
    isNecessary: true,
    url: 'https://www.notion.so/4bfd637b63324d93b5deb2360a14fb26?pvs=4',
  },
  {
    text: '마케팅 수신 동의 (선택)',
    type: 'marketingAgreement',
    isNecessary: false,
    url: 'https://www.notion.so/df134f4ec1c24461a8dd7393774c0c92?pvs=4',
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

  const handleConfirmAgree = async () => {
    LoadingIndicator.show({});
    await authApis.signUp({
      email: joinInfo.email,
      password: joinInfo.password,
      termUserAgreement: agreementInfo.find(
        (info) => info.type === 'termUserAgreement',
      )?.isChecked
        ? 'AGREE'
        : 'DISAGREE',
      personalInfoAgreement: agreementInfo.find(
        (info) => info.type === 'personalInfoAgreement',
      )?.isChecked
        ? 'AGREE'
        : 'DISAGREE',
      marketingAgreement: agreementInfo.find(
        (info) => info.type === 'marketingAgreement',
      )?.isChecked
        ? 'AGREE'
        : 'DISAGREE',
    });
    navigation.navigate('LoginId');
    LoadingIndicator.hide();
  };

  return (
    <FrameLayout paddingBottom={bottom} NavBar={<StackNavbar useBackButton />}>
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
              onPress={handleConfirmAgree}
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
