import React, { useRef, useState } from 'react';
import CodePush from 'react-native-code-push';
import { L } from '@design-system';
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
    <FrameLayout>
      {/* TODO  */}
      <L.Col />
    </FrameLayout>
  );
};

export default PageUpdateScreen;
