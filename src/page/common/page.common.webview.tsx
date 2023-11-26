import React from 'react';
import WebView from 'react-native-webview';
import StackNavbar from '@components/common/StackNavBar/StackNavBar';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationRoute from '@hooks/navigation/useNavigationRoute';

export const PageWebView: React.FC = () => {
  const {
    params: { url, title },
  } = useNavigationRoute('WebView');
  return (
    <FrameLayout>
      <StackNavbar useBackButton title={title || ''} />
      <WebView
        source={{
          uri: url,
        }}
        showsVerticalScrollIndicator={false}
        decelerationRate="normal"
        style={{ flex: 1 }}
        javaScriptEnabled
      />
    </FrameLayout>
  );
};
