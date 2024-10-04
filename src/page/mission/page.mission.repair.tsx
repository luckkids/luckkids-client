import React, { useCallback, useRef, useState, useEffect } from 'react';
import {
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  ViewToken,
} from 'react-native';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRecoilState } from 'recoil';
import { DEFAULT_MARGIN } from '@constants';
import { Button, Font, IconNames, L, SvgIcon } from '@design-system';
import { useMissionList, useMissionOutcomeList } from '@queries';
import { MissionType } from '@types-index';
import { missionApis } from '@apis/mission';
import StackNavBar from '@components/common/StackNavBar/StackNavBar';
import { MissionRepairCategoryItem } from '@components/page/mission/mission.repair.category.item';
import { MissionRepairItem } from '@components/page/mission/mission.repair.item';
import { FrameLayout } from '@frame/frame.layout';
import LoadingIndicator from '@global-components/common/LoadingIndicator/LoadingIndicator';
import useNavigationRoute from '@hooks/navigation/useNavigationRoute';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { RecoilInitialSetting } from '@recoil/recoil.initialSetting';
import { IMissionData, IMissionDataItem } from '@types-common/page.types';

export const PageMissionRepair = () => {
  const {
    params: { type = 'MISSION_REPAIR' },
  } = useNavigationRoute('MissionRepair');
  const navigation = useNavigationService();
  const { bottom } = useSafeAreaInsets();
  const [initialSetting, setInitialSetting] =
    useRecoilState(RecoilInitialSetting);

  const [selectedMissions, setSelectedMissions] = useState<IMissionDataItem[]>(
    [],
  );

  const {
    data: missionData,
    refetch: refetchMissionData,
    isFetching,
  } = useMissionList();

  const { refetch: refetchMissionOutcomeData } = useMissionOutcomeList();

  const allCategories = Array.from(
    new Set([
      ...Object.keys(missionData?.userMissions || {}),
      ...Object.keys(missionData?.luckkidsMissions || {}),
    ]),
  );

  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const [openedCategories, setOpenedCategories] =
    useState<string[]>(allCategories);
  const flatListRef = useRef<FlatList>(null);
  const categoryFlatListRef = useRef<FlatList>(null);
  const [isManualScrolling, setIsManualScrolling] = useState(false);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 10,
  }).current;

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && !isManualScrolling) {
        const firstVisibleItem = viewableItems[0];
        const newCategory = firstVisibleItem.item.missionType;

        const categoryIndex = allCategories.findIndex(
          (category) => category === newCategory,
        );

        if (categoryIndex !== -1 && categoryFlatListRef.current) {
          categoryFlatListRef.current.scrollToIndex({
            index: categoryIndex,
            animated: true,
            viewPosition: 0.5,
          });

          setSelectedCategory(newCategory);
        }
      }
    },
    [allCategories, isManualScrolling, categoryFlatListRef],
  );

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  const handleConfirm = () => {
    if (type === 'INITIAL_SETTING') {
      setInitialSetting({
        ...initialSetting,
        missions: selectedMissions.map((selectedMission) => ({
          missionType: selectedMission.missionType as MissionType,
          missionDescription: selectedMission.missionDescription || '',
          alertTime: selectedMission.alertTime,
        })),
      });
      return navigation.navigate('TutorialSettingNoti');
    } else {
      return 'Mission';
    }
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

  const renderCategoryMissionData = (): {
    id: string;
    missionType: string;
    missions: IMissionDataItem[];
  }[] => {
    return allCategories.map((item, i) => {
      const userMissions =
        missionData?.userMissions[item as keyof IMissionData];
      const luckkidsMissions =
        missionData?.luckkidsMissions[item as keyof IMissionData];

      const missions = [
        ...(userMissions || []),
        ...(luckkidsMissions || []),
      ] as IMissionDataItem[];

      return {
        id: item,
        missionType: item,
        missions: missions,
      };
    });
  };

  // 카테고리 스크롤 이동
  const scrollToCategory = useCallback(
    (category: string) => {
      if (category && flatListRef.current) {
        const categoryIndex = allCategories.findIndex((c) => c === category);
        if (categoryIndex !== -1) {
          // 해당 category open (이미 열려있을때에도 처리 필요)
          if (!openedCategories.includes(category)) {
            setOpenedCategories([...openedCategories, category]);
          }

          setIsManualScrolling(true);
          flatListRef.current.scrollToIndex({
            index: categoryIndex,
            animated: true,
            viewPosition: 0,
          });

          // 스크롤 애니메이션이 끝난 후 isManualScrolling을 false로 설정
          setTimeout(() => {
            setIsManualScrolling(false);
          }, 500); // 애니메이션 duration에 맞춰 조정 필요
        }
      }
    },
    [allCategories, openedCategories, setOpenedCategories],
  );

  const renderCategoryItem = useCallback(
    ({ item }: { item: string }) => (
      <MissionRepairCategoryItem
        isActive={selectedCategory === item}
        label={item}
        onPress={() => {
          scrollToCategory(item);
          setSelectedCategory(item);
        }}
      />
    ),
    [selectedCategory, scrollToCategory],
  );

  const handleToggleMissionActive = async (
    mission: IMissionDataItem,
    isSelected: boolean,
  ) => {
    // 일반 미션 수정 페이지인 경우는 바로 변경 사항 수행
    if (isSelected) {
      // 새로 추가하는 미션일 경우
      mission.luckkidsMissionId
        ? await missionApis.createMission({
            luckkidsMissionId: mission.luckkidsMissionId,
            missionType: mission.missionType,
            missionDescription: mission.missionDescription,
            alertStatus: 'CHECKED',
            alertTime: mission.alertTime,
          })
        : await missionApis.editMission({
            missionId: mission.id,
            data: {
              missionActive: 'TRUE',
            },
          });
    } else {
      // 삭제하는 미션
      await missionApis.editMission({
        missionId: mission.id,
        data: {
          missionActive: 'FALSE',
        },
      });
    }

    await refetchMissionData();
    await refetchMissionOutcomeData();
  };

  const renderCategoryMissionList = ({
    item,
  }: {
    item: {
      id: string;
      missionType: string;
      missions: IMissionDataItem[];
    };
  }) => {
    const { missionType, missions } = item;
    const isOpened = openedCategories.includes(missionType);

    return (
      <React.Fragment>
        <TouchableWithoutFeedback
          onPress={() => {
            if (openedCategories.includes(missionType)) {
              setOpenedCategories(
                openedCategories.filter((category) => category !== missionType),
              );
            } else {
              setOpenedCategories([...openedCategories, missionType]);
            }
          }}
        >
          <L.Row items={'center'} justify={'space-between'} mb={30} ph={25}>
            <L.Row items={'center'}>
              <SvgIcon
                name={categoryButton(missionType).icon as IconNames}
                size={62}
              />
              <Font type={'TITLE3_SEMIBOLD'} style={{ marginLeft: 16 }}>
                {categoryButton(missionType).label}
              </Font>
            </L.Row>
            <L.Row>
              <SvgIcon name={isOpened ? 'arrowUp' : 'arrowDown'} size={14} />
            </L.Row>
          </L.Row>
        </TouchableWithoutFeedback>
        {isOpened && (
          <L.Col mb={20}>
            {missions.map((mission, i) => {
              const isSelected =
                type === 'INITIAL_SETTING'
                  ? selectedMissions.includes(mission)
                  : mission.missionActive === 'TRUE';

              return (
                <MissionRepairItem
                  key={i}
                  {...mission}
                  isSelected={isSelected}
                  onSelect={(isSelected) => {
                    // 일반 미션 수정 페이지인 경우는 바로 변경 사항 수행
                    if (type === 'MISSION_REPAIR') {
                      handleToggleMissionActive(mission, isSelected);
                    } else {
                      if (!isSelected) {
                        setSelectedMissions(
                          selectedMissions.filter((m) => m.id !== mission.id),
                        );
                      } else {
                        setSelectedMissions([...selectedMissions, mission]);
                      }
                    }
                  }}
                />
              );
            })}
          </L.Col>
        )}
      </React.Fragment>
    );
  };

  useEffect(() => {
    setOpenedCategories(allCategories);
  }, [missionData]);

  useEffect(() => {
    if (isFetching) LoadingIndicator.show({});
    else LoadingIndicator.hide();
  }, [isFetching]);

  useEffect(() => {
    setSelectedCategory(allCategories[0]);
  }, [allCategories]);

  return (
    <FrameLayout NavBar={<StackNavBar useBackButton />}>
      <L.Row pv={20} ph={25}>
        <Font type={'TITLE2_BOLD'}>
          {'행운의 습관을 선택하고\n알림을 설정해 보세요!'}
        </Font>
      </L.Row>
      {/* 습관 추가 / 습관 선택 */}
      <L.Row ph={25} pv={15}>
        <MissionRepairCategoryItem
          isAddButton={true}
          label={'습관추가'}
          onPress={() => navigation.navigate('MissionAdd')}
        />
        {allCategories?.length !== 0 && (
          <FlatList
            ref={categoryFlatListRef}
            data={allCategories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginLeft: 8, gap: 8, paddingRight: 20 }}
          />
        )}
      </L.Row>
      {/* 습관 리스트 */}
      <FlatList
        ref={flatListRef}
        style={{
          marginTop: 24,
        }}
        contentContainerStyle={{
          paddingBottom: bottom + 50,
        }}
        data={renderCategoryMissionData()}
        renderItem={renderCategoryMissionList}
        keyExtractor={(item) => item.id}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 500));
          wait.then(() => {
            flatListRef.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          });
        }}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        onMomentumScrollBegin={() => setIsManualScrolling(false)}
      />
      {type === 'INITIAL_SETTING' && (
        <L.Absolute b={bottom} w={SCREEN_WIDTH}>
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
  );
};
