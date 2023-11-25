import React, { createElement, useState } from 'react';
import { Text, TouchableWithoutFeedback } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
  Button,
  Font,
  L,
  SimpleTextInput,
  SvgIcon,
  TextInputField,
  Toggle,
} from '@design-system';
import FloatingButton from '@components/common/FloatingButton/FloatingButton';
import StackNavbar from '@components/common/StackNavBar/StackNavBar';
import { FrameLayout } from '@frame/frame.layout';
import AlertPopup from '@global-components/common/AlertPopup/AlertPopup';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import LoadingIndicator from '@global-components/common/LoadingIndicator/LoadingIndicator';
import SnackBar from '@global-components/common/SnackBar/SnackBar';

export const Home: React.FC = () => {
  const [toggle, setToggle] = React.useState(false);
  const [text, setText] = useState('');

  // EXAMPLE: BottomSheet
  const handlePressBottomSheet = () => {
    BottomSheet.show({
      component: <Text>내용</Text>,
    });
  };

  // EXAMPLE: Alert Popup
  const handlePressAlertPopup = () => {
    AlertPopup.show({
      title: '제목',
      body: '내용',
      noText: '취소',
      yesText: '확인',
    });
  };

  // EXAMPLE: Loading Indicator
  const handlePressLoadingIndicator = () => {
    LoadingIndicator.show({});
    setTimeout(() => {
      LoadingIndicator.hide();
    }, 1000);
  };

  // EXAMPLE: SnackBar
  const handlePressSnackBar = () => {
    SnackBar.show({
      leftElement: createElement(SvgIcon, {
        name: 'lucky_check',
        size: 20,
      }),
      title: '링크가 복사됐어요',
      position: 'bottom',
    });
    setTimeout(() => {
      SnackBar.hide();
    }, 1000);
  };

  const navigation = useNavigation<
    NavigationProp<{
      // TODO(gil): 타입 추론 가능하도록 수정 필요?
      마이: undefined;
      Test: undefined;
      HomeTest: undefined;
    }>
  >();
  return (
    <>
      <FrameLayout>
        <L.Row>
          <TouchableWithoutFeedback onPress={handlePressAlertPopup}>
            <Font type={'LARGE_TITLE_BOLD'}>Alert Popup</Font>
          </TouchableWithoutFeedback>
        </L.Row>
      </FrameLayout>
      <FloatingButton text={'플로팅 버튼'} onPress={() => {}} />
    </>
  );
};
