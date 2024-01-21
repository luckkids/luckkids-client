import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingViewProps,
  Platform,
} from 'react-native';

const { width: _SCREEN_WIDTH, height: _SCREEN_HEIGHT } =
  Dimensions.get('screen');
const { width: _WINDOW_WIDTH, height: _WINDOW_HEIGHT } =
  Dimensions.get('window');

// TO BE FIXED
const BOTTOM_TABBAR_HEIGHT = 82;
const TOP_NAVIGATION_HEIGHT = 52;
export const DEFAULT_MARGIN = 20;
const MIN_PADDING_BOTTOM = 8;

const IS_IOS = Platform.OS === 'ios';
const IS_ANDROID = Platform.OS === 'android';
const RN_VERSION = Platform.constants.reactNativeVersion;

const KEYBOARD_BEHAVIOR = Platform.select<
  KeyboardAvoidingViewProps['behavior']
>({
  ios: 'padding',
  android: undefined,
});

const KEYBOARD_SHOW_EVENT = Platform.select<
  Parameters<typeof Keyboard.addListener>[0]
>({
  ios: 'keyboardWillShow',
  android: 'keyboardDidShow',
  default: 'keyboardDidShow',
});

const KEYBOARD_HIDE_EVENT = Platform.select<
  Parameters<typeof Keyboard.addListener>[0]
>({
  ios: 'keyboardWillHide',
  android: 'keyboardDidHide',
  default: 'keyboardDidHide',
});

const SCREEN_WIDTH = Math.min(_SCREEN_WIDTH, _SCREEN_HEIGHT);
const SCREEN_HEIGHT = Math.max(_SCREEN_WIDTH, _SCREEN_HEIGHT);

const WINDOW_WIDTH = Math.min(_WINDOW_WIDTH, _WINDOW_HEIGHT);
const WINDOW_HEIGHT = Math.max(_WINDOW_WIDTH, _WINDOW_HEIGHT);

export default {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  BOTTOM_TABBAR_HEIGHT,
  TOP_NAVIGATION_HEIGHT,
  IS_ANDROID,
  IS_IOS,
  DEFAULT_MARGIN,
  KEYBOARD_BEHAVIOR,
  KEYBOARD_SHOW_EVENT,
  KEYBOARD_HIDE_EVENT,
  RN_VERSION,
  MIN_PADDING_BOTTOM,
};
