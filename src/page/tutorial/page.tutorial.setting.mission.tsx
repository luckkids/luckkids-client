import React from 'react';
import { DEFAULT_MARGIN } from '@constants';
import { Font, L } from '@design-system';
import { FrameLayout } from '@frame/frame.layout';

//TODO Fix bg image
const bgImage = require('assets/images/tutorial-setting-bg.png');

export const PageTutorialSettingMission: React.FC = () => {
  return (
    <FrameLayout
      statusBarColor={'TUTORIAL_SETTING_BG'}
      backgroundImage={bgImage}
    >
      <L.Col w="100%" items="center" ph={DEFAULT_MARGIN} h="100%">
        <Font textAlign="center" type={'TITLE1_BOLD'} color={'WHITE'} mt={200}>
          {'미션 페이지!'}
        </Font>
      </L.Col>
    </FrameLayout>
  );
};
