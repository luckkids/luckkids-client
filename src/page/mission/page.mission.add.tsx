import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { Button } from '@design-system';
import { FrameLayout } from '@frame/frame.layout';
import { AppScreens, IPage } from '@types-common/page.types';
import { useFetch } from '@hooks/useFetch';

const S = {
  Text: styled.Text({
    textAlign: 'center',
  }),
  Button: styled.Button({}),
};

export const PageMissionAdd: React.FC<IPage> = (props) => {
  const { onFetch } = useFetch({
    method: 'GET',
    url: '/api/v1/missions',
  });

  useEffect(() => {
    onFetch();
  }, []);
  return (
    <FrameLayout>
      <S.Text>습관추가</S.Text>
      <Button
        type={'action'}
        text={'추가하기'}
        sizing="stretch"
        bgColor={'LUCK_GREEN'}
        onPress={() => props.navigation.navigate(AppScreens.MissionRepair)}
      />
      {/*<Button type={'action'} text={'데이터'} onPress={getData} />*/}
    </FrameLayout>
  );
};
