import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { Button } from '@design-system';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { useFetch } from '@hooks/useFetch';

const S = {
  Text: styled.Text({
    textAlign: 'center',
  }),
  Button: styled.Button({}),
};

export const PageMissionAdd: React.FC = () => {
  const navigation = useNavigationService();
  const { onFetch } = useFetch({
    method: 'POST',
    url: '/api/v1/missions/new',
  });

  useEffect(() => {
    // onFetch();
  }, []);
  return (
    <FrameLayout>
      <S.Text>습관추가</S.Text>
      <Button
        type={'action'}
        text={'추가하기'}
        sizing="stretch"
        bgColor={'LUCK_GREEN'}
        onPress={() => navigation.navigate('MissionRepair')}
      />
      {/*<Button type={'action'} text={'데이터'} onPress={getData} />*/}
    </FrameLayout>
  );
};
