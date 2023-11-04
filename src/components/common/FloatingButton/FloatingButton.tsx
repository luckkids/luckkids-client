import {
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { Colors, Font } from '@design-system';

interface FloatingButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
  text: string;
  children?: React.ReactNode;
  isBottomTabShown?: boolean;
  onPress: () => void;
  paddingBottom?: number;
}

function FloatingButton({
  containerStyle,
  text,
  children,
  onPress,
  paddingBottom = 38,
}: FloatingButtonProps) {
  return (
    <View
      style={StyleSheet.flatten([
        styles.container,
        {
          bottom: paddingBottom,
          backgroundColor: Colors['GREY3'],
        },
        containerStyle,
      ])}
    >
      <TouchableWithoutFeedback onPress={onPress}>
        <>
          {text && <Font type={'BODY_REGULAR'}>{text}</Font>}
          {children}
        </>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 40,
  },
});

export default FloatingButton;
