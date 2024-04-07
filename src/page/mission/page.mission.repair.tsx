import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Font, IconNames, L, SvgIcon } from '@design-system';
import { DataDummyMissionRepair } from '../../data/dummy/data.dummy.mission.repair';
import FloatingButton from '@components/common/FloatingButton/FloatingButton';
import StackNavBar from '@components/common/StackNavBar/StackNavBar';
import { MissionRepairCategoryItem } from '@components/page/mission/mission.repair.category.item';
import { MisstionRepairItem } from '@components/page/mission/misstion.repair.item';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { useFetch } from '@hooks/useFetch';
import { IMissionDataItem, IMissionRepair } from '@types-common/page.types';

export const PageMissionRepair = () => {
  const [allCategory, setAllCategory] = useState<Array<string>>([]);
  const navigation = useNavigationService();
  const [current, setCurrent] = useState<number | null>(null);
  const [isRemove, setIsRemove] = useState<boolean>(false);
  const { onFetch, resultData, isSuccess } = useFetch({
    method: 'GET',
    url: '/missions',
    value: {},
  });
  const list = { ...resultData } as {
    [key: string]: Array<IMissionDataItem>;
  };
  const [dataDicArray, setDataDicArray] = useState<Array<string>>(
    Object.keys(list),
  );
  useEffect(() => {
    onFetch();
    setAllCategory(Object.keys(list));
    setDataDicArray(Object.keys(list));
  }, [isSuccess]);

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
        <ScrollView>
          <L.Row p={24}>
            <Font type={'TITLE2_BOLD'}>
              행운의 습관을 선택하고 알림을 설정해 보세요!
            </Font>
          </L.Row>
          <L.Row ph={25} pv={15}>
            <MissionRepairCategoryItem
              isAddButton={true}
              label={'습관추가'}
              onPress={() => navigation.navigate('MissionAdd')}
            />
            {allCategory.length !== 0 && (
              <ScrollView horizontal={true}>
                <L.Row ml={8} g={8}>
                  {allCategory.map((item, i) => {
                    return (
                      <MissionRepairCategoryItem
                        isActive={isRemove ? !isRemove : i === current}
                        label={item}
                        onPress={() => {
                          if (i === current && !isRemove) {
                            setIsRemove(true);
                            setDataDicArray(allCategory);
                            return;
                          }
                          setCurrent(i);
                          setIsRemove(false);
                          setDataDicArray([item]);
                        }}
                        key={i}
                      />
                    );
                  })}
                </L.Row>
              </ScrollView>
            )}
          </L.Row>
          {dataDicArray.map((item, i) => {
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
                {list[item].map((value, i) => {
                  return (
                    <MisstionRepairItem
                      {...value}
                      isCheck={value.alertStatus === 'CHECKED'}
                      isSetAlarm={true}
                      key={i}
                    />
                  );
                })}
              </React.Fragment>
            );
          })}
        </ScrollView>
      </FrameLayout>
      <FloatingButton
        text={'홈(임시버튼)'}
        onPress={() => navigation.navigate('Home')}
      />
    </>
  );
};
