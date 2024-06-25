import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import CodePush from 'react-native-code-push';
import { DEFAULT_MARGIN } from '@constants';
import { Font, L } from '@design-system';
import ProgressBar from '@components/common/ProgressBar/ProgressBar';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationRoute from '@hooks/navigation/useNavigationRoute';
import useAsyncEffect from '@hooks/useAsyncEffect';

const PageUpdateScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);

  const downloading = useRef(false);

  const {
    params: { remotePackage },
  } = useNavigationRoute('UpdateScreen');

  useAsyncEffect(async () => {
    if (!remotePackage || downloading.current) return;

    downloading.current = true;

    const newPackage = await remotePackage.download(
      ({ receivedBytes, totalBytes }) =>
        setProgress(receivedBytes / totalBytes),
    );

    newPackage.install(CodePush.InstallMode.IMMEDIATE);

    CodePush.restartApp();
  }, [remotePackage]);

  return (
    <FrameLayout backgroundColor="LUCK_GREEN" statusBarColor="LUCK_GREEN">
      {/* TODO  */}
      <L.Col
        ph={DEFAULT_MARGIN}
        items="center"
        h="100%"
        justify="space-between"
        pb={40}
      >
        {/* luckkids 로고 */}
        <L.Col flex-1 justify="center">
          <Image
            source={require('@design-system/assets/images/main-logo.png')}
            style={{
              resizeMode: 'contain',
              width: 136,
              height: 107,
            }}
          />
        </L.Col>
        <L.Row>
          <ProgressBar
            progress={progress}
            height={4}
            backgroundColor="BLACK"
            activeColor="WHITE"
          />
        </L.Row>
        <Font
          type="SUBHEADLINE_REGULAR"
          color="GREY5"
          mt={20}
          textAlign="center"
        >
          {
            '보다 나은 서비스를 위해\n럭키즈를 최신 버전으로 업데이트하고 있어요.'
          }
        </Font>
      </L.Col>
    </FrameLayout>
  );
};

export default PageUpdateScreen;
