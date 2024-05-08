import React, { useEffect, useState } from 'react';
import { Colors, Font, L, SvgIcon } from '@design-system';
import ButtonText from '../design-system/components/Button/ButtonText';
import Constants from '../design-system/constants';
import FloatingButton from '@components/common/FloatingButton/FloatingButton';
import { MissionItem } from '@components/page/mission/mission.item';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { useFetch } from '@hooks/useFetch';
import { IMissionListData } from '@types-common/page.types';
import { ScrollView } from 'react-native';
import { SCREEN_HEIGHT } from '@gorhom/bottom-sheet';
import { useIsFocused } from '@react-navigation/native';

export const Mission: React.FC = () => {
  const [hide, setHide] = useState<boolean>(false);
  const [data, setData] = useState<Array<IMissionListData>>([]);
  const [hideData, setHideData] = useState<Array<IMissionListData>>([]);
  const [count, setCount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const navigation = useNavigationService();
  const isFocused = useIsFocused();
  const { onFetch: missionList, isSuccess: missionListIsSuccess } = useFetch({
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
        <L.Row>
          <Font type={'FOOTNOTE_REGULAR'}>클로버</Font>
          <Font type={'FOOTNOTE_REGULAR'}>+3</Font>
        </L.Row>
        <L.Row p={24} justify={'space-between'}>
          <Font type={'LARGE_TITLE_BOLD'}>미션 달성하기</Font>
          <Font type={'LARGE_TITLE_REGULAR'} color={'LUCK_GREEN'}>
            {count}/{total}
          </Font>
        </L.Row>
        <L.Row ph={24} pt={48} justify={'space-between'}>
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
        <ScrollView style={{ height: SCREEN_HEIGHT - 82 }}>
          {hide
            ? hideData.map((item, i) => {
                return (
                  <MissionItem
                    {...item}
                    key={i}
                    setCount={setCount}
                    prevCount={count}
                  />
                );
              })
            : data.map((item, i) => {
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
        paddingBottom={Constants.BOTTOM_TABBAR_HEIGHT + 38}
        onPress={() => navigation.navigate('MissionRepair')}
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
