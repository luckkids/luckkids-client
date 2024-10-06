import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import FastImage, { ImageStyle } from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { CONSTANTS, ColorKeys, Colors } from '@design-system';

interface FrameLayoutProps {
  NavBar?: React.ReactNode;
  children: React.ReactNode;
  backgroundColor?: ColorKeys;
  statusBarColor?: ColorKeys;
  statusBarStyle?: 'light-content' | 'dark-content';
  backgroundImage?: string | number;
  backgroundImageStyle?: ImageStyle;
  backgroundStyle?: StyleProp<ViewStyle>;
  stickToTop?: boolean;
  enableKeyboardAvoidingView?: boolean;
  paddingBottom?: number;
}

export const FrameLayout = ({
  NavBar,
  children,
  backgroundColor,
  statusBarColor,
  statusBarStyle,
  backgroundImage,
  backgroundImageStyle,
  backgroundStyle,
  stickToTop = false,
  enableKeyboardAvoidingView = true,
  paddingBottom,
}: FrameLayoutProps) => {
  const theme = useTheme();
  const { top, bottom: safeAreaBottom } = useSafeAreaInsets();

  const isLocalImage = typeof backgroundImage === 'number';

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{
        backgroundColor: theme.BG_PRIMARY,
        width: SCREEN_WIDTH,
        flex: 1,
      }}
      enabled={enableKeyboardAvoidingView}
    >
      <MyStatusBar
        backgroundColor={Colors[statusBarColor || 'BG_PRIMARY']}
        barStyle={statusBarStyle || 'light-content'}
      />
      <View
        style={StyleSheet.flatten([
          {
            backgroundColor: Colors[backgroundColor || 'BG_PRIMARY'],
            width: SCREEN_WIDTH,
            flex: 1,
            ...(paddingBottom !== undefined && {
              paddingBottom: paddingBottom || (safeAreaBottom === 0 ? 20 : 0),
            }),
          },
          backgroundStyle,
        ])}
      >
        {backgroundImage && (
          <View
            style={{
              position: 'absolute',
              top: stickToTop ? -top : 0,
              left: 0,
              bottom: safeAreaBottom + CONSTANTS.BOTTOM_TABBAR_HEIGHT,
              width: SCREEN_WIDTH,
              height: (SCREEN_WIDTH * 790) / 390,
              zIndex: -1,
              backgroundColor: 'transparent',
            }}
          >
            <FastImage
              source={
                isLocalImage
                  ? backgroundImage
                  : {
                      uri: backgroundImage,
                      priority: FastImage.priority.normal,
                    }
              }
              style={{
                width: SCREEN_WIDTH,
                height: (SCREEN_WIDTH * 844) / 390,
                ...backgroundImageStyle,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        )}
        {NavBar}
        {children}
      </View>
    </KeyboardAvoidingView>
  );
};
type StatusBarProps = {
  backgroundColor: string;
  barStyle: 'light-content' | 'dark-content';
};

const MyStatusBar: React.FC<StatusBarProps> = ({
  backgroundColor,
  ...props
}) => (
  <View style={[{ backgroundColor, height: StatusBar.currentHeight }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);
