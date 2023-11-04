import React from 'react';
import { ScrollView, View } from 'react-native';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';

interface IProps {
  children: React.ReactNode;
}

interface FrameLayoutProps {
  NavBar?: React.ReactNode;
  children: React.ReactNode;
}

export const FrameLayout = ({ NavBar, children }: FrameLayoutProps) => {
  const theme = useTheme();
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor: theme.BG_PRIMARY,
        width: SCREEN_WIDTH,
        paddingTop: top,
        flex: 1,
      }}
    >
      {NavBar}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          backgroundColor: theme.BG_PRIMARY,
        }}
      >
        {children}
      </ScrollView>
    </View>
  );
};
