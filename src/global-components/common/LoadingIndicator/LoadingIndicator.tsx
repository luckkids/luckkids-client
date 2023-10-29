import React from 'react';
import { ActivityIndicator } from 'react-native';
import {
  FullScreenOverlay,
  FullScreenLayout,
  createPopup,
} from 'react-native-global-components';
import { useTheme } from 'styled-components/native';
import { L } from '@design-system';

const LoadingIndicator = () => {
  const theme = useTheme();

  return (
    <FullScreenLayout>
      <FullScreenOverlay />
      <L.Row
        p={24}
        rounded={16}
        style={{ backgroundColor: 'black', opacity: 0.8 }}
      >
        <ActivityIndicator size="large" color={theme.WHITE} />
      </L.Row>
    </FullScreenLayout>
  );
};

export default createPopup(LoadingIndicator);
