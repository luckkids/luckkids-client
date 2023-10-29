import React from 'react';
import { Text } from 'react-native';
import { Button } from '@design-system';
import { FrameLayout } from '@frame/frame.layout';
import { AppScreens, IPage } from '@types-common/page.types';

export const Mission: React.FC<IPage> = (props) => {
  return (
    <FrameLayout>
      <Text>Mission</Text>
      <Button
        type={'action'}
        text={'습관편집'}
        onPress={() => props.navigation.navigate(AppScreens.MissionRepair)}
        sizing="stretch"
        bgColor={'LUCK_GREEN'}
      />
    </FrameLayout>
  );
};
