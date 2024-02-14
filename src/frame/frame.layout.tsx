import React, { useEffect } from 'react';
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { CONSTANTS, ColorKeys, Colors } from '@design-system';

interface FrameLayoutProps {
  NavBar?: React.ReactNode;
  children: React.ReactNode;
  backgroundColor?: ColorKeys;
  statusBarColor?: ColorKeys;
  statusBarStyle?: 'light-content' | 'dark-content';
  backgroundImage?: ImageSourcePropType;
  backgroundStyle?: StyleProp<ViewStyle>;
}

export const FrameLayout = ({
  NavBar,
  children,
  backgroundColor,
  statusBarColor,
  statusBarStyle,
  backgroundImage,
  backgroundStyle,
}: FrameLayoutProps) => {
  const theme = useTheme();
  const { top, bottom } = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{
        backgroundColor: theme.BG_PRIMARY,
        width: SCREEN_WIDTH,
        flex: 1,
      }}
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
            paddingBottom: bottom,
          },
          backgroundStyle,
        ])}
      >
        {backgroundImage && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: bottom + CONSTANTS.BOTTOM_TABBAR_HEIGHT,
              width: SCREEN_WIDTH,
              height: (SCREEN_WIDTH * 790) / 390,
              zIndex: -1,
            }}
          >
            <ImageBackground
              source={backgroundImage}
              style={{
                width: SCREEN_WIDTH,
                height: (SCREEN_WIDTH * 790) / 390,
              }}
              resizeMode="cover"
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
