import React, { createElement, useState } from 'react';
import { Text, TouchableWithoutFeedback } from 'react-native';
import { FrameLayout } from '@frame/frame.layout';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppScreens, IPage } from '@types-common/page.types';
import {
  Button,
  Font,
  L,
  SimpleTextInput,
  SvgIcon,
  TextInputField,
  Toggle,
} from '@design-system';
import AlertPopup from '@global-components/common/AlertPopup/AlertPopup';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import LoadingIndicator from '@global-components/common/LoadingIndicator/LoadingIndicator';
import SnackBar from '@global-components/common/SnackBar/SnackBar';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import StackNavbar from '@components/common/StackNavBar/StackNavBar';
import FloatingButton from '@components/common/FloatingButton/FloatingButton';

export const Home: React.FC<IPage> = (props) => {
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
      <FrameLayout NavBar={<StackNavbar title={'홈'} useBackButton />}>
        <L.Col p={24}>
          <Font type={'LARGE_TITLE_REGULAR'}>큰타이틀</Font>
          <Font type={'LARGE_TITLE_BOLD'}>큰타이틀</Font>
        </L.Col>
        <L.Col p={24}>
          <TextInputField
            text={text}
            title={'이메일 주소가 무엇인가요?'}
            description="나중에 이 이메일 주소를 확인해야 합니다."
            onChangeText={setText}
            placeholder="email"
            RightComponent={<SvgIcon name={'validation_check'} size={20} />}
          />
          <TextInputField
            text={text}
            title={'이메일 주소가 무엇인가요?'}
            description="나중에 이 이메일 주소를 확인해야 합니다."
            onChangeText={setText}
            placeholder="email"
          />
          <TextInputField
            text={text}
            title={'비밀번호 만들기'}
            description="8자 이상을 사용하세요."
            onChangeText={setText}
            placeholder="password"
            secureTextEntry
            RightComponent={
              <SvgIcon name={'password_visibility_on'} size={20} />
            }
          />
        </L.Col>
        <L.Col p={24}>
          <SimpleTextInput
            text={text}
            onChangeText={setText}
            placeholder="email"
          />
        </L.Col>
        <L.Col p={24} g={20}>
          <Button
            type={'action'}
            text={'버튼'}
            onPress={() => {}}
            sizing="stretch"
            bgColor={'LUCK_GREEN'}
          />
          <Button
            type={'action'}
            text={'버튼'}
            onPress={() => {}}
            sizing="stretch"
            bgColor={'BG_TERTIARY'}
            textColor={'WHITE'}
          />
          <Button
            type={'action'}
            text={'친구 더 부르기'}
            onPress={() => {}}
            sizing="stretch"
            bgColor={'BG_TERTIARY'}
            textColor={'WHITE'}
            iconName="bell"
            iconPosition="leading"
          />
          <Button
            type={'action'}
            text={'친구 더 부르기'}
            onPress={() => {}}
            sizing="stretch"
            bgColor={'BG_TERTIARY'}
            textColor={'WHITE'}
            iconName="bell"
            iconPosition="trailing"
          />
          <Toggle value={toggle} onChange={setToggle} />
        </L.Col>
        <L.Row>
          <TouchableWithoutFeedback onPress={handlePressBottomSheet}>
            <Text>Bottom Sheet</Text>
          </TouchableWithoutFeedback>
        </L.Row>
        <L.Row>
          <TouchableWithoutFeedback onPress={handlePressAlertPopup}>
            <Text>Alert Popup</Text>
          </TouchableWithoutFeedback>
        </L.Row>
        <L.Row>
          <TouchableWithoutFeedback onPress={handlePressLoadingIndicator}>
            <Text>Loading Indicator</Text>
          </TouchableWithoutFeedback>
        </L.Row>
        <L.Row>
          <TouchableWithoutFeedback onPress={handlePressSnackBar}>
            <Text>SnackBar</Text>
          </TouchableWithoutFeedback>
        </L.Row>

        <L.Row mt={40}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('마이');
            }}
          >
            <Text>마이탭으로 이동</Text>
          </TouchableWithoutFeedback>
        </L.Row>
        <L.Row mt={40}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('Test');
            }}
          >
            <Text>Test</Text>
          </TouchableWithoutFeedback>
        </L.Row>
        <L.Row mt={40}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('HomeTest');
            }}
          >
            <Text>HomeTest</Text>
          </TouchableWithoutFeedback>
        </L.Row>
      </FrameLayout>
      <FloatingButton text={'플로팅 버튼'} onPress={() => {}} />
    </>
  );
};
