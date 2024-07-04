import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { format } from 'date-fns';
import { DEFAULT_MARGIN } from '@constants';
import { Font, L } from '@design-system';
import { useSettingNotices } from '@queries';
import StackNavBar from '@components/common/StackNavBar/StackNavBar';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { ISettingNotice } from '@types-common/page.types';

export const PageSettingNotice: React.FC = () => {
  const navigation = useNavigationService();
  const { data: notices = [] } = useSettingNotices();

  const handlePressNotice = (notice: ISettingNotice) => {
    navigation.navigate('WebView', {
      url: notice.url,
    });
  };

  return (
    <FrameLayout NavBar={<StackNavBar title={'공지사항'} useBackButton />}>
      {notices?.map((item, i) => {
        return (
          <TouchableWithoutFeedback
            onPress={() => handlePressNotice(item)}
            key={item.id}
          >
            <L.Col pv={DEFAULT_MARGIN} ph={DEFAULT_MARGIN} g={8}>
              <Font type={'BODY_REGULAR'}>{item.title}</Font>
              <Font type={'SUBHEADLINE_REGULAR'} color={'GREY1'}>
                {format(item.createdDate, 'yyyy.MM.dd')}
              </Font>
            </L.Col>
          </TouchableWithoutFeedback>
        );
      })}
    </FrameLayout>
  );
};
