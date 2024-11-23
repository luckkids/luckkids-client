import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import {
  createPopup,
  FullScreenOverlay,
  KeyboardAvoidingLayout,
  useFadeAnimationStyle,
  useSlideAnimationStyle,
  usePopupContext,
} from 'react-native-global-components';
import Animated from 'react-native-reanimated';
import { DEFAULT_MARGIN } from '@constants';
import { Button, Font, L } from '@design-system';

interface AlertPopupProps {
  body?: string;
  title?: string;
  yesText?: string;
  noText?: string;
  onPressYes?: () => void | Promise<void>;
  onPressNo?: () => void;
  headerComponent?: React.ReactElement;
  footerComponent?: React.ReactElement;
  isIconDisabled?:boolean;
}

const AlertPopupContent: React.FC<AlertPopupProps> = ({
  title,
  body,
  noText,
  onPressNo,
  onPressYes,
  isIconDisabled,
  yesText = '확인',
  headerComponent,
  footerComponent,
}) => {
  const { hide } = usePopupContext();

  const { style } = useFadeAnimationStyle();

  const { style: slide } = useSlideAnimationStyle({ translateY: -30 });

  const handlePressYes = async () => {
    if (onPressYes) await onPressYes();
    hide();
  };

  const handlePressNo = async () => {
    if (onPressNo) onPressNo();
    hide();
  };

  return (
    <KeyboardAvoidingLayout
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      keyboardVerticalOffset={-100}
    >
      <FullScreenOverlay hideOnPressOverlay />
      <Animated.View style={[styles.container, style, slide]}>
        <L.Col p={16} w={'100%'} rounded={15} bg="BG_SECONDARY">
          {!!title && (
            <L.Layout pv={15}>
              <Font type={'TITLE2_BOLD'}>{title}</Font>
            </L.Layout>
          )}
          {headerComponent}
          {!!body && (
            <L.Layout pb={footerComponent ? 10 : 0}>
              <Font type={'BODY_REGULAR'} color={'GREY0'}>
                {body}
              </Font>
            </L.Layout>
          )}
          {footerComponent}
          <L.Row g={8} w={'100%'} mt={24}>
            {!!noText && (
              <L.Row flex-1>
                <Button
                  type={'action'}
                  text={noText}
                  sizing="stretch"
                  isIconDisabled={isIconDisabled}
                  onPress={handlePressNo}
                  bgColor="BG_TERTIARY"
                  textColor="WHITE"
                />
              </L.Row>
            )}
            <L.Row flex-1>
              <Button
                type={'action'}
                text={yesText}
                sizing="stretch"
                isIconDisabled={isIconDisabled}
                onPress={handlePressYes}
                bgColor="LUCK_GREEN"
              />
            </L.Row>
          </L.Row>
        </L.Col>
      </Animated.View>
    </KeyboardAvoidingLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: DEFAULT_MARGIN,
  },
});

const AlertPopup = createPopup(AlertPopupContent);

export default AlertPopup;
