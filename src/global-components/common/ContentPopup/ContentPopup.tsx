import { Linking, Platform, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
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
import { Button, ColorKeys, Font, L } from '@design-system';
import { PopupButton } from '@apis/popup';

interface IContentPopup {
  label: string;
  title: string;
  description: string;
  imageUrl: string | null;
  buttons: PopupButton[];
}

const ContentPopupContent: React.FC<IContentPopup> = ({
  label,
  title,
  description,
  imageUrl,
  buttons,
}: IContentPopup) => {
  const { hide } = usePopupContext();

  const { style } = useFadeAnimationStyle();

  const { style: slide } = useSlideAnimationStyle({ translateY: -30 });

  const handlePressButton = async (button: PopupButton) => {
    if (button.link) {
      Linking.openURL(button.link);
    }
    hide();
  };

  return (
    <KeyboardAvoidingLayout
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      keyboardVerticalOffset={-100}
    >
      <FullScreenOverlay hideOnPressOverlay />
      <Animated.View style={[styles.container, style, slide]}>
        <L.Col pt={30} pb={30} ph={16} w={'100%'} items='center' rounded={15} bg='WHITE'>
          <L.Row>
            <Font type={'BODY_SEMIBOLD'} color={'LUCK_GREEN'}>
              {label}
            </Font>
          </L.Row>
          {!!title && (
            <L.Layout pb={8} pt={6}>
              <Font type={'TITLE2_BOLD'} color='BLACK'>{title}</Font>
            </L.Layout>
          )}
          {!!description && (
            <L.Layout>
              <Font type={'SUBHEADLINE_REGULAR'} color={'GREY2'} textAlign='center'>
                {description}
              </Font>
            </L.Layout>
          )}
          {!!imageUrl && (
            <L.Layout pv={20} items="center">
              <FastImage
                source={{
                  uri: imageUrl,
                  priority: FastImage.priority.high,
                }}
                style={styles.image}
                resizeMode={FastImage.resizeMode.contain}
              />
            </L.Layout>
          )}
          <L.Row g={8} w={'100%'} mt={24}>
            {buttons.map((button) => (
              <L.Row key={button.text} flex={1}>
                <Button
                  type={'action'}
                  text={button.text}
                  sizing="stretch"
                  onPress={() => handlePressButton(button)}
                  bgColor={button.bgColor as ColorKeys}
                  textColor={button.textColor as ColorKeys}
                  isIconDisabled={true}
                />
              </L.Row>
            ))}
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
  image: {
    width: 235,
    height: 235,
    maxWidth: '100%',
  },
});

const ContentPopup = createPopup(ContentPopupContent);

export default ContentPopup;
