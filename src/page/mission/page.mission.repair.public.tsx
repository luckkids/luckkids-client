import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { DEFAULT_MARGIN } from '@constants';
import { Font, IconNames, L, SvgIcon } from '@design-system';
import StackNavBar from '@components/common/StackNavBar/StackNavBar';
import { MissionRepairItem } from '@components/page/mission/misstion.repair.item';
import { FrameLayout } from '@frame/frame.layout';
import { useFetch } from '@hooks/useFetch';
import { IMissionListData } from '@types-common/page.types';

const category = [
  'HOUSEKEEPING',
  'SELF_CARE',
  'HEALTH',
  'WORK',
  'MINDSET',
  'SELF_DEVELOPMENT',
];
export const PageMissionRepairPublic = () => {
  const [hasCategory, setHasCategory] = useState<Array<string>>([]);
  const [listData, setListData] = useState<IMissionListData[]>([]);
  const isFocus = useIsFocused();

  const { onFetch, isSuccess } = useFetch({
    method: 'GET',
    url: '/initialSetting/luckMission',
    value: {},
    onSuccessCallback: (rtn) => {
      setListData(rtn);
      setHasCategory(
        Array.from(
          new Set(
            (rtn as IMissionListData[])
              .map((item) => item.missionType)
              .filter((type) => category.includes(type)),
          ),
        ),
      );
    },
  });
  useEffect(() => {
    if (isFocus) onFetch();
  }, [isSuccess]);

  useEffect(() => {}, []);

  const categoryButton = useCallback((key: string) => {
    switch (key) {
      case 'HOUSEKEEPING':
        return {
          label: '집 정돈',
          icon: 'iconHomeCare',
        };
      case 'SELF_CARE':
        return {
          label: '셀프케어',
          icon: 'iconSelfCare',
        };
      case 'HEALTH':
        return {
          label: '건강',
          icon: 'iconHealth',
        };
      case 'WORK':
        return {
          label: '일',
          icon: 'iconWorking',
        };
      case 'MINDSET':
        return {
          label: '마인드셋',
          icon: 'iconMindSet',
        };
      case 'SELF_DEVELOPMENT':
        return {
          label: '자기계발',
          icon: 'iconGrowth',
        };
      default:
        return {
          label: '집 정돈',
          icon: 'iconHomeCare',
        };
    }
  }, []);
  return (
    <>
      <FrameLayout NavBar={<StackNavBar useBackButton />}>
        <L.Row p={24}>
          <Font type={'TITLE2_BOLD'}>
            행운의 습관을 선택하고 알림을 설정해 보세요!
          </Font>
        </L.Row>
        <ScrollView
          contentInset={{
            bottom: DEFAULT_MARGIN + 30,
          }}
        >
          {hasCategory.map((item, i) => {
            return (
              <React.Fragment key={i}>
                <L.Row items={'center'} mt={40} mb={30} ph={25}>
                  <SvgIcon
                    name={categoryButton(item).icon as IconNames}
                    size={62}
                  />
                  <Font type={'TITLE3_SEMIBOLD'} style={{ marginLeft: 16 }}>
                    {categoryButton(item).label}
                  </Font>
                </L.Row>
                {listData
                  .filter((type) => type.missionType === item)
                  .map((value, index) => {
                    return <MissionRepairItem {...value} key={index} />;
                  })}
              </React.Fragment>
            );
          })}
        </ScrollView>
      </FrameLayout>
    </>
  );
};
