import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useIsFocused } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRecoilState } from 'recoil';
import { DEFAULT_MARGIN } from '@constants';
import { Button, Font, IconNames, L, SvgIcon } from '@design-system';
import StackNavBar from '@components/common/StackNavBar/StackNavBar';
import { MissionRepairCategoryItem } from '@components/page/mission/mission.repair.category.item';
import { MissionRepairItem } from '@components/page/mission/misstion.repair.item';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationRoute from '@hooks/navigation/useNavigationRoute';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { useFetch } from '@hooks/useFetch';
import { RecoilInitialSetting } from '@recoil/recoil.initialSetting';
import { IMissionDataItem } from '@types-common/page.types';

interface IDataKey {
  [key: string]: Array<IMissionDataItem>;
}

export const PageMissionRepair = () => {
  const {
    params: { type },
  } = useNavigationRoute('MissionRepair');
  const [allCategory, setAllCategory] = useState<Array<string>>([]);
  const navigation = useNavigationService();
  const [current, setCurrent] = useState<number | null>(null);
  const [isRemove, setIsRemove] = useState<boolean>(false);
  const [listCategory, setListCategory] = useState<Array<string>>([]);
  const [dataDicArray, setDataDicArray] = useState<IDataKey>({});
  const isFocus = useIsFocused();
  const { bottom } = useSafeAreaInsets();
  const [initialSetting, setInitialSetting] =
    useRecoilState(RecoilInitialSetting);

  const { onFetch, isSuccess } = useFetch({
    method: 'GET',
    url: '/missions',
    value: {},
    onSuccessCallback: (rtn) => {
      setListCategory(Object.keys(rtn));
      setAllCategory(Object.keys(rtn));
      setDataDicArray({ ...rtn });
    },
  });
  useEffect(() => {
    if (isFocus) onFetch();
  }, [isSuccess]);

  const handleConfirm = () => {
    setInitialSetting({
      ...initialSetting,
      missions: [],
    });
    return navigation.navigate('TutorialSettingNoti');
  };

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
                          setListCategory(allCategory);
                          return;
                        }
                        setCurrent(i);
                        setIsRemove(false);
                        setListCategory([item]);
                      }}
                      key={i}
                    />
                  );
                })}
              </L.Row>
            </ScrollView>
          )}
        </L.Row>
        <ScrollView
          contentInset={{
            bottom: DEFAULT_MARGIN + 30,
          }}
        >
          {listCategory.map((item, i) => {
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
                {dataDicArray[item]?.map((value, i) => {
                  return (
                    <MissionRepairItem
                      {...value}
                      isDisable={false}
                      isCheck={value.alertStatus === 'CHECKED'}
                      key={i}
                      isDisable={false}
                    />
                  );
                })}
              </React.Fragment>
            );
          })}
        </ScrollView>
        {type === 'INITIAL_SETTING' && (
          <L.Absolute b={bottom + 35} w={SCREEN_WIDTH}>
            <L.Row ph={DEFAULT_MARGIN}>
              <Button
                type={'action'}
                text={'선택 완료'}
                onPress={handleConfirm}
                sizing="stretch"
                textColor="BLACK"
                bgColor={'LUCK_GREEN'}
              />
            </L.Row>
          </L.Absolute>
        )}
      </FrameLayout>
    </>
  );
};
