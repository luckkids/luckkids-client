import React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import {
  createPopup,
  FullScreenOverlay,
  KeyboardAvoidingLayout,
  useFadeAnimationStyle,
  useHideOnAndroidBackPress,
  useSlideAnimationStyle,
  usePopupContext,
} from 'react-native-global-components';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { L } from '@design-system';

interface AlertPopupProps {
  body?: string;
  title?: string;
  yesText?: string;
  noText?: string;
  onPressYes?: () => void | Promise<void>;
  onPressNo?: () => void;
  headerComponent?: React.ReactElement;
  footerComponent?: React.ReactElement;
  androidBackHandler?: () => void;
  blockAndroidBackPress?: boolean;
}

const AlertPopupUI: React.FC<AlertPopupProps> = ({
  title,
  body,
  noText,
  onPressNo,
  onPressYes,
  yesText = '확인',
  headerComponent,
  footerComponent,
  androidBackHandler,
  blockAndroidBackPress,
}) => {
  const { hide } = usePopupContext();

  const { style } = useFadeAnimationStyle();

  const { style: slide } = useSlideAnimationStyle({ translateY: -30 });

  //TODO connect with yes button
  const handlePressYes = async () => {
    if (onPressYes) await onPressYes();
    hide();
  };

  //TODO connect with no button
  const handlePressNo = async () => {
    if (onPressNo) onPressNo();
    hide();
  };

  useHideOnAndroidBackPress({
    enabled: !blockAndroidBackPress,
    backHandler: androidBackHandler,
  });

  return (
    <KeyboardAvoidingLayout
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      keyboardVerticalOffset={-100}
    >
      <FullScreenOverlay hideOnPressOverlay />
      <Animated.View style={[styles.container, style, slide]}>
        <PopupContainer>
          {!!title && (
            <L.Layout pv={15}>
              <Text>{title}</Text>
            </L.Layout>
          )}
          {headerComponent}
          {!!body && (
            <L.Layout pb={footerComponent ? 10 : 25}>
              <Text>{body}</Text>
            </L.Layout>
          )}
          {footerComponent}
        </PopupContainer>
      </Animated.View>
    </KeyboardAvoidingLayout>
  );
};

const PopupContainer = styled.View`
  width: 90%;
  background-color: white;
  border-radius: 24px;
  padding: 20px;
  align-items: center;
`;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const AlertPopup = createPopup(AlertPopupUI);

export default AlertPopup;
