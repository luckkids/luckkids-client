import React, { useCallback, useRef, useState, useEffect } from 'react';
import { FlatList, TouchableWithoutFeedback } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Font, IconNames, L, SvgIcon } from '@design-system';
import { useMissionList, useMissionOutcomeList } from '@queries';
import { missionApis } from '@apis/mission';
import StackNavBar from '@components/common/StackNavBar/StackNavBar';
import Tooltip from '@components/common/Tooltip/Tooltip';
import { MissionRepairCategoryItem } from '@components/page/mission/mission.repair.category.item';
import { MissionRepairItem } from '@components/page/mission/mission.repair.item';
import { FrameLayout } from '@frame/frame.layout';
import LoadingIndicator from '@global-components/common/LoadingIndicator/LoadingIndicator';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { StorageKeys } from '@hooks/storage/keys';
import useAsyncStorage from '@hooks/storage/useAsyncStorage';
import useGoogleAnalytics from '@hooks/useGoogleAnalytics';
import { IMissionData, IMissionDataItem } from '@types-common/page.types';

export const PageMissionRepair = () => {
  const navigation = useNavigationService();
  const { bottom } = useSafeAreaInsets();
  const [showTimeRepairTooltip, setShowTimeRepairTooltip] = useState(true);

  const { storedValue: missionTimeRepairTooltip } =
    useAsyncStorage<StorageKeys.MissionTimeRepairTooltip>(
      StorageKeys.MissionTimeRepairTooltip,
    );

  const { storedValue: missionDeleteTooltip } =
    useAsyncStorage<StorageKeys.MissionDeleteTooltip>(
      StorageKeys.MissionDeleteTooltip,
    );

  const {
    data: missionData,
    refetch: refetchMissionData,
    isLoading: isLoadingMissionList,
  } = useMissionList();

  // FIXME: 초기 셋팅을 위한 미션 리스트 조회 (미사용)
  // const { data: initialLuckkidsMissionData } = useInitialLuckkidsMissionList();

  const {
    refetch: refetchMissionOutcomeData,
    isLoading: isLoadingMissionOutcomeList,
  } = useMissionOutcomeList();

  const { logEvent } = useGoogleAnalytics();

  const allCategories = Array.from(
    new Set([
      ...Object.keys(missionData?.userMissions || {}),
      ...Object.keys(missionData?.luckkidsMissions || {}),
    ]),
  );

  const [selectedCategory, setSelectedCategory] = useState<string>(
    allCategories[0],
  );

  const [openedCategories, setOpenedCategories] =
    useState<string[]>(allCategories);
  const flatListRef = useRef<FlatList>(null);

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
    return allCategories.map((item) => {
      const userMissions =
        missionData?.userMissions[item as keyof IMissionData];
      const luckkidsMissions =
        missionData?.luckkidsMissions[item as keyof IMissionData];

      // NOTE: 미션 필터링 로직 추가
      // 만약 userMissions와 luckkidsMissions에 둘 다 luckkidsMissionId가 똑같은게 존재한다면,
      // luckkidsMissions에서 해당 미션 제거
      const filteredLuckkidsMissions = luckkidsMissions?.filter(
        (luckkidsMission) => {
          return !userMissions?.some(
            (userMission) =>
              userMission.luckkidsMissionId ===
              luckkidsMission.luckkidsMissionId,
          );
        },
      );

      const missions = [
        ...(userMissions || []),
        ...(filteredLuckkidsMissions?.map((mission) => ({
          ...mission,
          isLuckkidsMission: true, // 대표 미션 여부
        })) || []),
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

          flatListRef.current.scrollToIndex({
            index: categoryIndex,
            animated: true,
            viewPosition: 0,
          });
        }
      }
    },
    [allCategories, openedCategories, setOpenedCategories],
  );

  const handleTooltipDismiss = useCallback(() => {
    setShowTimeRepairTooltip(false);
  }, []);

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
    if (isSelected) {
      // 새로 추가하는 미션일 경우

      // 대표 미션이거나 대표 미션을 이용해서 만든 미션인 경우
      if (mission.luckkidsMissionId) {
        if (mission.isLuckkidsMission) {
          // 대표 미션 체크
          await missionApis.createMission({
            luckkidsMissionId: mission.luckkidsMissionId,
            missionType: mission.missionType,
            missionDescription: mission.missionDescription,
            alertStatus: 'CHECKED',
            alertTime: mission.alertTime,
          });
        } else {
          // 대표 미션을 이용해서 만든 미션 체크
          await missionApis.editMission({
            missionId: mission.id,
            data: {
              missionActive: 'TRUE',
            },
          });
        }

        logEvent({
          eventName: 'ADD_LUCKKIDS_MISSION',
          params: {
            category: mission.missionType,
            name: mission.missionDescription,
          },
        });
      } else {
        // 유저가 직접 추가한 미션
        await missionApis.editMission({
          missionId: mission.id,
          data: {
            missionActive: 'TRUE',
          },
        });
      }
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
    index: categoryIndex,
  }: {
    item: {
      id: string;
      missionType: string;
      missions: IMissionDataItem[];
    };
    index: number;
  }) => {
    const { missionType, missions } = item;
    const isOpened = openedCategories.includes(missionType);

    const showAlarmSettingTooltip =
      categoryIndex === 0 &&
      showTimeRepairTooltip &&
      (!missionTimeRepairTooltip || missionTimeRepairTooltip.viewed === false);

    // user가 직접 추가한 미션만 필터링
    const userMissions = missionData?.userMissions
      ? Object.keys(missionData.userMissions)
          .map((key) => missionData.userMissions[key as keyof IMissionData])
          .flat()
          .filter((m) => m.luckkidsMissionId === null)
      : [];

    const showDeleteMissionTooltip =
      !isLoadingMissionList &&
      !isLoadingMissionOutcomeList &&
      openedCategories.includes(missionType) &&
      !showAlarmSettingTooltip &&
      userMissions.length === 1 &&
      missionType === userMissions[0].missionType &&
      (!missionDeleteTooltip || missionDeleteTooltip.viewed === false);

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
          <L.Row items={'center'} justify={'space-between'} mb={36} ph={25}>
            {showDeleteMissionTooltip && (
              <L.Absolute b={-20} r={16} z={2}>
                <Tooltip
                  text={'추가한 습관은 밀어서 삭제할 수 있어요'}
                  bgColor="LUCK_GREEN"
                  opacity={1}
                  textColor="BLACK"
                  arrowPosition="right"
                  arrowOffset={-20}
                />
              </L.Absolute>
            )}
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
              const isSelected = mission.missionActive === 'TRUE';
              return (
                <MissionRepairItem
                  key={i}
                  isSelected={isSelected}
                  showAlarmSettingTooltip={showAlarmSettingTooltip && i === 0}
                  onTooltipDismiss={handleTooltipDismiss}
                  onSelect={(isSelected) => {
                    handleToggleMissionActive(mission, isSelected);
                  }}
                  {...mission}
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
    if (isLoadingMissionList || isLoadingMissionOutcomeList)
      return LoadingIndicator.show({});
    else {
      LoadingIndicator.hide();
      setSelectedCategory(allCategories[0]);
    }
  }, [isLoadingMissionList, isLoadingMissionOutcomeList]);

  return (
    <FrameLayout NavBar={<StackNavBar useBackButton />}>
      <L.Row pv={20} ph={25}>
        <Font type={'TITLE2_BOLD'}>
          {'행운의 습관을 선택하고\n알림을 설정해 보세요!'}
        </Font>
      </L.Row>
      {/* 습관 추가 / 습관 선택 */}
      <L.Row ph={25} pv={15}>
        <L.Row mr={8}>
          <MissionRepairCategoryItem
            isAddButton={true}
            label={'습관추가'}
            onPress={() => {
              navigation.navigate('MissionAdd');
            }}
          />
        </L.Row>
        {allCategories?.length !== 0 && (
          <FlatList
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
      />
    </FrameLayout>
  );
};
