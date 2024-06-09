import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Colors, CONSTANTS, Font, L, SvgIcon } from '@design-system';
import ButtonText from '../design-system/components/Button/ButtonText';
import FloatingButton from '@components/common/FloatingButton/FloatingButton';
import { MissionItem } from '@components/page/mission/mission.item';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { useFetch } from '@hooks/useFetch';
import { IMissionListData } from '@types-common/page.types';

export const Mission: React.FC = () => {
  const [hide, setHide] = useState<boolean>(false);
  const [data, setData] = useState<Array<IMissionListData>>([]);
  const [hideData, setHideData] = useState<Array<IMissionListData>>([]);
  const [count, setCount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const navigation = useNavigationService();
  const isFocused = useIsFocused();
  const resultItemData = useMemo(() => {
    if (hide) {
      return data.filter((item) => {
        return item.missionStatus === 'FAILED';
      });
    } else {
      return data;
    }
  }, [hide]);
  const { onFetch: missionList } = useFetch({
    method: 'GET',
    url: '/missionOutcomes',
    value: {},
    onSuccessCallback: (rtn) => {
      setData(rtn);
      setHideData(
        rtn.filter((item: IMissionListData) => item.missionStatus === 'FAILED'),
      );
      setTotal(rtn.length);
      setCount(
        rtn.filter((item: IMissionListData) => item.missionStatus === 'SUCCEED')
          .length,
      );
    },
  });
  useEffect(() => {
    if (isFocused) missionList();
  }, [isFocused]);

  return (
    <>
      <FrameLayout>
        <L.Row ph={24} justify={'flex-end'}>
          <Font type={'FOOTNOTE_REGULAR'}>누적된 수행 습관 545</Font>
          {/*<Font type={'FOOTNOTE_REGULAR'}>+3</Font>*/}
        </L.Row>
        <L.Row p={24} pt={40} justify={'space-between'}>
          <Font type={'LARGE_TITLE_BOLD'}>오늘의 습관</Font>
          <Font type={'LARGE_TITLE_REGULAR'} color={'LUCK_GREEN'}>
            {count}/{total}
          </Font>
        </L.Row>
        <L.Row ph={24} pt={48} pb={10} justify={'space-between'}>
          <Font type={'SUBHEADLINE_REGULAR'} color={'GREY1'}>
            지금까지 {count}개 완료했어요!
          </Font>
          <ButtonText
            text={hide ? '보기' : '숨기기'}
            onPress={() => setHide(!hide)}
            fontType={'SUBHEADLINE_REGULAR'}
            textColor={'LUCK_GREEN'}
          />
        </L.Row>
        <ScrollView
          contentInset={{
            bottom: CONSTANTS.BOTTOM_TABBAR_HEIGHT,
          }}
        >
          {resultItemData.map((item, i) => {
            return (
              <MissionItem
                {...item}
                key={i}
                setCount={setCount}
                prevCount={count}
              />
            );
          })}
        </ScrollView>
      </FrameLayout>
      <FloatingButton
        paddingBottom={CONSTANTS.BOTTOM_TABBAR_HEIGHT + 38}
        onPress={() => navigation.navigate('MissionRepair', {})}
        containerStyle={{
          width: 36,
          height: 36,
          paddingVertical: 0,
          paddingHorizontal: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.WHITE,
        }}
      >
        <SvgIcon name={'iconPlusDark'} size={'16.6'} />
      </FloatingButton>
    </>
  );
};
