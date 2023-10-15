import React from 'react';
import { Text, TouchableWithoutFeedback } from 'react-native';
import { L } from '@design-system';
import { FrameLayout } from '../frame/frame.layout';
import AlertPopup from '@global-components/common/AlertPopup/AlertPopup';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import LoadingIndicator from '@global-components/common/LoadingIndicator/LoadingIndicator';

const handlePressBottomSheet = () => {
  BottomSheet.show({
    component: <Text>내용</Text>,
  });
};

const handlePressAlertPopup = () => {
  AlertPopup.show({
    title: '제목',
    body: '내용',
    noText: '취소',
    yesText: '확인',
  });
};

const handlePressLoadingIndicator = () => {
  LoadingIndicator.show({});
  setTimeout(() => {
    LoadingIndicator.hide();
  }, 3000);
};

export const Home = () => {
  return (
    <FrameLayout>
      <L.Row p={24}>
        <Text>Luck Maker</Text>
      </L.Row>
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
    </FrameLayout>
  );
};
