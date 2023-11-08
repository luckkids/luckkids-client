import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useTheme } from 'styled-components/native';
import { ColorKeys } from '@design-system';

interface KeyboardAvoidingTemplateProps {
  children?: React.ReactNode;
  bgColor?: ColorKeys;
}

export const FrameLayoutKeyboard: React.FC<KeyboardAvoidingTemplateProps> = ({
  children,
  bgColor = 'BG_PRIMARY',
}) => {
  const theme = useTheme();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{
        backgroundColor: theme.BG_PRIMARY,
        width: SCREEN_WIDTH,
        flex: 1,
      }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: theme[bgColor] }}>
        {children}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
