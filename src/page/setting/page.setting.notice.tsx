import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';
import StackNavBar from '@components/common/StackNavBar/StackNavBar';
import { TouchableWithoutFeedback } from 'react-native';
import { Font, L } from '@design-system';
import { useFetch } from '@hooks/useFetch';
import { IResponse } from '../../types/recoil/types.recoil';
import { ISettingNotice } from '@types-common/page.types';

const S = {
  Text: styled.Text({
    textAlign: 'center',
  }),
  Button: styled.Button({}),
};

export const PageSettingNotice: React.FC = () => {
  const navigation = useNavigationService();
  const [data, setData] = useState<Array<ISettingNotice>>([]);
  const { onFetch } = useFetch({
    method: 'GET',
    url: '/notices/',
    value: {},
    onSuccessCallback: (rtn) => {
      setData(rtn);
    },
  });
  useEffect(() => {
    onFetch();
  }, []);
  return (
    <FrameLayout NavBar={<StackNavBar title={'공지사항'} useBackButton />}>
      {data?.map((item, i) => {
        return (
          <TouchableWithoutFeedback onPress={() => console.log('aa')} key={i}>
            <L.Col pv={25} ph={25}>
              <Font type={'BODY_REGULAR'}>{item.title}</Font>
              <Font type={'SUBHEADLINE_REGULAR'} color={'GREY1'}>
                {item.createdDate}
              </Font>
            </L.Col>
          </TouchableWithoutFeedback>
        );
      })}
    </FrameLayout>
  );
};
