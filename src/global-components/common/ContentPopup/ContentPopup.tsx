import { Platform, StyleSheet } from 'react-native';
import {
  createPopup,
  FullScreenOverlay,
  KeyboardAvoidingLayout,
  useFadeAnimationStyle,
  usePopupContext,
  useSlideAnimationStyle,
} from 'react-native-global-components';
import Animated from 'react-native-reanimated';
import { DEFAULT_MARGIN } from '@constants';
import { Button, Font, L } from '@design-system';

interface IContentPopup {
  label: string;
  title: string;
  description: string;
  imageUrl: string;
  noText: string;
  onPressNo: () => void;
  yesText: string;
  onPressYes: () => void;
}

const ContentPopupContent: React.FC<IContentPopup> = ({
  label,
  title,
  description,
  onPressNo,
  onPressYes,
  yesText,
  noText,
}: IContentPopup) => {
  const { hide } = usePopupContext();

  const { style } = useFadeAnimationStyle();

  const { style: slide } = useSlideAnimationStyle({ translateY: -30 });

  const handlePressNo = async () => {
    if (onPressNo) onPressNo();
    hide();
  };

  const handlePressYes = async () => {
    if (onPressYes) onPressYes();
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
          <L.Row>
            <Font type={'BODY_SEMIBOLD'} color={'LUCK_GREEN'}>
              {label}
            </Font>
          </L.Row>
          {!!title && (
            <L.Layout pv={15}>
              <Font type={'TITLE2_BOLD'}>{title}</Font>
            </L.Layout>
          )}
          {!!description && (
            <L.Layout pv={15}>
              <Font type={'SUBHEADLINE_REGULAR'} color={'GREY2'}>
                {description}
              </Font>
            </L.Layout>
          )}
          <L.Row g={8} w={'100%'} mt={24}>
            <Button
              type={'action'}
              text={yesText}
              sizing="stretch"
              onPress={handlePressNo}
              bgColor="LUCK_GREEN"
              textColor="BLACK"
            />
            <Button
              type={'action'}
              text={noText}
              sizing="stretch"
              onPress={handlePressYes}
              bgColor="BG_TERTIARY"
              textColor="WHITE"
            />
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

const ContentPopup = createPopup(ContentPopupContent);

export default ContentPopup;
