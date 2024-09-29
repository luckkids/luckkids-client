import React, { useCallback, useRef, useState, useEffect } from 'react';
import { FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRecoilState } from 'recoil';
import { DEFAULT_MARGIN } from '@constants';
import { Button, Font, IconNames, L, SvgIcon } from '@design-system';
import { useMissionList } from '@queries';
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
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const allCategories = Array.from(
    new Set([
      ...Object.keys(missionData?.userMissions || {}),
      ...Object.keys(missionData?.luckkidsMissions || {}),
    ]),
  );
  const [openedCategories, setOpenedCategories] =
    useState<string[]>(allCategories);
  const flatListRef = useRef<FlatList>(null);

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

      // userMissions의 luckkidsMissionsId와 luckkidsMissions의 id 중복 검사
      // 그런데 겹치는게 있다면 luckkidsMissionId가 없는 것을 가져온다
      // 그런데 겹치는게 없다면 luckkidsMissionId가 있는 것을 가져온다

      const filteredMissions = [
        ...(userMissions || []).filter((mission) => !mission.luckkidsMissionId),
        ...(luckkidsMissions || []).filter(
          (luckkidsMission) =>
            !(userMissions || []).some(
              (userMission) =>
                userMission.luckkidsMissionId === luckkidsMission.id,
            ),
        ),
      ];

      return {
        id: item,
        missionType: item,
        missions: filteredMissions,
      };
    });
  };

  const handleToggleMissionActive = async (
    mission: IMissionDataItem,
    isSelected: boolean,
  ) => {
    // 일반 미션 수정 페이지인 경우는 바로 변경 사항 수행
    const res = await missionApis.editMission({
      missionId: mission.luckkidsMissionId || mission.id,
      data: {
        missionActive: isSelected ? 'TRUE' : 'FALSE',
      },
    });

    if (res) {
      refetchMissionData();
    }
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
                  type={type}
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

  // 카테고리 스크롤 이동
  const scrollToCategory = (category: string) => {
    if (category && flatListRef.current) {
      const categoryIndex = allCategories.findIndex((c) => c === category);
      if (categoryIndex !== -1) {
        // 해당 cateogry open (이미 열려있을때에도 처리 필요)
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
  };

  useEffect(() => {
    setOpenedCategories(allCategories);
  }, [missionData]);

  useEffect(() => {
    if (isFetching) LoadingIndicator.show({});
    else LoadingIndicator.hide();
  }, [isFetching]);

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
          <ScrollView horizontal={true}>
            <L.Row ml={8} g={8}>
              {allCategories.map((item, i) => {
                return (
                  <MissionRepairCategoryItem
                    isActive={selectedCategory === item ? true : null}
                    label={item}
                    onPress={() => {
                      scrollToCategory(item);
                      setSelectedCategory(item);
                    }}
                    key={item}
                  />
                );
              })}
            </L.Row>
          </ScrollView>
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
