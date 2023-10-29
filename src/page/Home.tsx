import React from 'react';
import { Text, TouchableWithoutFeedback } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, Font, L } from '@design-system';
import { FrameLayout } from '../frame/frame.layout';
import AlertPopup from '@global-components/common/AlertPopup/AlertPopup';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import LoadingIndicator from '@global-components/common/LoadingIndicator/LoadingIndicator';

export const Home = () => {
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

  const navigation = useNavigation<
    NavigationProp<{
      // TODO(gil): 타입 추론 가능하도록 수정 필요?
      마이: undefined;
      Test: undefined;
      HomeTest: undefined;
    }>
  >();
  return (
    <FrameLayout>
      <L.Col p={24}>
        <Font type={'LARGE_TITLE_REGULAR'}>큰타이틀</Font>
        <Font type={'LARGE_TITLE_BOLD'}>큰타이틀</Font>
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
  );
};
