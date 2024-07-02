import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { Font, L } from '@design-system';
import { useSettingNotices } from '@queries';
import StackNavBar from '@components/common/StackNavBar/StackNavBar';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';

const S = {
  Text: styled.Text({
    textAlign: 'center',
  }),
  Button: styled.Button({}),
};

export const PageSettingNotice: React.FC = () => {
  const navigation = useNavigationService();
  const { data: notices = [] } = useSettingNotices();

  return (
    <FrameLayout NavBar={<StackNavBar title={'공지사항'} useBackButton />}>
      {notices?.map((item, i) => {
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
