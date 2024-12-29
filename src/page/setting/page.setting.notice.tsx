import React, { useEffect } from 'react';
import { ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { format } from 'date-fns';
import { DEFAULT_MARGIN } from '@constants';
import { Font, L } from '@design-system';
import { useSettingNotices } from '@queries';
import StackNavBar from '@components/common/StackNavBar/StackNavBar';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';
import Logger from '@libs/LoggerService';
import { ISettingNotice } from '@types-common/page.types';

export const PageSettingNotice: React.FC = () => {
  const navigation = useNavigationService();
  const { data: notices, isLoading } = useSettingNotices();

  const handlePressNotice = (notice: ISettingNotice) => {
    return navigation.navigate('WebView', {
      url: notice.url,
    });
  };

  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator />;
    }

    if (!notices?.length) {
      return (
        <L.Col items="center" justify="center" flex-1>
          <Font type="BODY_REGULAR" color="GREY1">
            공지사항이 없습니다.
          </Font>
        </L.Col>
      );
    }

    return notices.map((item) => (
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
    ));
  };

  useEffect(() => {
    Logger.info('Arrived PageSettingNotice.tsx & checking notices', {
      notices,
    });
  }, [notices]);

  return (
    <FrameLayout NavBar={<StackNavBar title={'공지사항'} useBackButton />}>
      {renderContent()}
    </FrameLayout>
  );
};
