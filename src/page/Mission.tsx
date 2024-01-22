import React, { useEffect, useState } from 'react';
import { Font, L } from '@design-system';
import ButtonText from '../design-system/components/Button/ButtonText';
import FloatingButton from '@components/common/FloatingButton/FloatingButton';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { useFetch } from '@hooks/useFetch';
import { MissionItem } from '@components/page/mission/mission.item';
import { IMissionListData } from '@types-common/page.types';

export const Mission: React.FC = () => {
  const [hide, setHide] = useState<boolean>(false);
  const [data, setData] = useState<Array<IMissionListData>>();
  const [count, setCount] = useState<number>(0);
  const navigation = useNavigationService();
  const { onFetch: missionList, isSuccess: missionListIsSuccess } = useFetch({
    method: 'GET',
    url: '/missionOutcomes',
    value: {},
    onSuccessCallback: (rtn) => {
      setData(rtn);
      rtn.map((item: IMissionListData) => {
        if (item.missionStatus === 'SUCCEED') {
          return setCount(count + 1);
        }
      });
    },
  });
  useEffect(() => {
    missionList();
  }, [missionListIsSuccess]);

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
            3/10
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
        {data?.map((item, i) => {
          if (!item) return;
          return <MissionItem {...item} key={i} setCount={setCount} />;
        })}
      </FrameLayout>
      <FloatingButton
        text={'편집'}
        onPress={() => navigation.navigate('MissionRepair')}
      />
    </>
  );
};
