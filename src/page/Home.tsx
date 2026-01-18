import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Animated,
  GestureResponderEvent,
  Image,
  ScrollView,
  View,
} from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSetRecoilState } from 'recoil';
import { DEFAULT_MARGIN } from '@constants';
import { ChipButton, CONSTANTS, Font, L, SvgIcon } from '@design-system';
import { useHomeInfo } from '@queries';
import {
  checkPendingInviteProcessed,
  FRIEND_CODE_PENDING_ACTION,
  getCharacterImage,
  getLevelToolTipText,
  markInviteAsProcessed,
  pendingInviteProcessed,
  POPUP_FRIEND_STATUS,
} from '@utils';
import { friendApis } from '@apis/friend';
import ProgressBar from '@components/common/ProgressBar/ProgressBar';
import Tooltip from '@components/common/Tooltip/Tooltip';
import HomeNavbar from '@components/page/home/home.navbar';
import HomeWeekCalendar from '@components/page/home/home.week.calendar';
import { FrameLayout } from '@frame/frame.layout';
import AlertPopup from '@global-components/common/AlertPopup/AlertPopup';
import LoadingIndicator from '@global-components/common/LoadingIndicator/LoadingIndicator';
import useNavigationRoute from '@hooks/navigation/useNavigationRoute';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { StorageKeys } from '@hooks/storage/keys';
import useAsyncStorage from '@hooks/storage/useAsyncStorage';
import useAsyncEffect from '@hooks/useAsyncEffect';
import { useFetch } from '@hooks/useFetch';
import usePopup from '@hooks/usePopup';
import { RecoilPopupState } from '@recoil/recoil.popup';

const luckkidsCloud = require('assets/images/luckkids-cloud.png');
const luckkidsClover = require('assets/images/luckkids-clover.png');
const luckkidsRabbit = require('assets/images/luckkids-rabbit.png');
const luckkidsSun = require('assets/images/luckkids-sun.png');
const luckkidsWaterDrop = require('assets/images/luckkids-waterdrop.png');

export const Home: React.FC = () => {
  const navigationService = useNavigationService();
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [checkPending, setCheckPending] = useState<string | null>(null);
  const { bottom } = useSafeAreaInsets();
  const { params } = useNavigationRoute('Home');
  const friendCode = params?.friendCode || '';
  const isFocused = useIsFocused();
  const setStatePopup = useSetRecoilState(RecoilPopupState);
  const [tooltipViewed, setTooltipViewed] = useState<boolean | undefined>(
    undefined,
  );

  const {
    storedValue: missionRepairAvailableTooltip,
    getCurrentValue: getMissionRepairAvailableTooltip,
  } = useAsyncStorage<StorageKeys.MissionRepairAvailableTooltip>(
    StorageKeys.MissionRepairAvailableTooltip,
  );

  useEffect(() => {
    const getPendingInvite = async () => {
      const pending = await checkPendingInviteProcessed();
      setCheckPending(pending);
    };

    getPendingInvite();
  }, []);

  const addFriend = async (code: string, nickname: string) => {
    try {
      // 기존 팝업을 먼저 닫기
      setStatePopup({ isShow: false });

      const res = await friendApis.createFriendByCode({ code });

      if (res) {
        await markInviteAsProcessed(code, POPUP_FRIEND_STATUS.FRIEND);
        await pendingInviteProcessed(
          friendCode,
          FRIEND_CODE_PENDING_ACTION.REMOVE,
        );
        setTimeout(() => {
          AlertPopup.show({
            title: `${nickname}님이 \n가든 목록에 추가되었어요!`,
            onPressYes: async () => {
              navigationService.navigate('Garden', {
                isAddFriend: true,
              });
            },
            yesText: '가든으로 가기',
            noText: '닫기',
            isIconDisabled: true,
          });
        }, 200);
      }
    } catch (e) {
      console.error('friends error', e);
    }
  };

  const onAlertHandler = async (
    rtn: { status: string; nickName: string },
    sendCode: string | null,
  ) => {
    const { nickName } = rtn;
    const sendFriendCode = sendCode || friendCode;
    switch (true) {
      case rtn.status === 'ME':
        AlertPopup.show({
          title: '내가 보낸 초대예요!',
          onPressYes: async () => {
            setStatePopup({ isShow: false });
            await markInviteAsProcessed(sendFriendCode, POPUP_FRIEND_STATUS.ME);
          },
        });
        return;
      case rtn.status === 'ALREADY':
        await markInviteAsProcessed(
          sendFriendCode,
          POPUP_FRIEND_STATUS.ALREADY,
        );
        AlertPopup.show({
          title: `이미 ${nickName}님과 친구예요.`,
          onPressYes: () => {
            navigationService.navigate('Garden', {});
          },
          yesText: '가든으로 가기',
          noText: '닫기',
          isIconDisabled: true,
        });
        return;
      default:
        await pendingInviteProcessed(
          sendFriendCode,
          FRIEND_CODE_PENDING_ACTION.SAVE,
        );
        AlertPopup.show({
          title: `${nickName}님이 \n친구 초대를 보냈어요!`,
          body: '친구 초대에 응하면 가든 목록에 추가됩니다.',
          onPressYes: () => addFriend(sendFriendCode, nickName),
          yesText: '친구하기',
          noText: '거절하기',
          onPressNo: async () => {
            await markInviteAsProcessed(
              sendFriendCode,
              POPUP_FRIEND_STATUS.NEGATIVE,
            );
            await pendingInviteProcessed(
              sendFriendCode,
              FRIEND_CODE_PENDING_ACTION.REMOVE,
            );
          },
        });
        return;
    }
  };

  const { onFetch: onCheckFriend } = useFetch({
    method: 'GET',
    url: `/friendcode/${friendCode}/nickname`,
    onSuccessCallback: async (rtn) => onAlertHandler(rtn, checkPending),
  });

  const handleViewProfile = (_e: GestureResponderEvent) => {
    navigationService.push('HomeProfile');
  };

  const infoTranslateY = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });

  const scrollToLuckkids = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  useLayoutEffect(() => {
    LoadingIndicator.show({});
    setTimeout(() => {
      LoadingIndicator.hide();
    }, 500);
  }, []);

  const { data: homeInfo, refetch: refetchHomeInfo } = useHomeInfo();
  const { luckkidsAchievementRate = 0, userCharacterSummaryResponse } =
    homeInfo || {};
  const { inProgressCharacter } = userCharacterSummaryResponse || {};

  // 홈 화면 focus 될때마다 홈 정보 가져오기
  useAsyncEffect(async () => {
    if (!isFocused) return;
    await refetchHomeInfo();
  }, [isFocused]);

  useAsyncEffect(async () => {
    if (friendCode && !checkPending) {
      onCheckFriend();
    } else if (checkPending) {
      onCheckFriend(`/friendcode/${checkPending}/nickname`);
    }
  }, [friendCode, checkPending]);

  useFocusEffect(() => {
    const checkTooltip = async () => {
      const tooltip = await getMissionRepairAvailableTooltip();
      setTooltipViewed(tooltip?.viewed ?? false);
    };
    checkTooltip();
  });

  // 팝업 표시
  usePopup(isFocused);

  return (
    <>
      <FrameLayout
        NavBar={<HomeNavbar onPressLuckkids={scrollToLuckkids} />}
        backgroundImage={
          inProgressCharacter &&
          getCharacterImage(
            inProgressCharacter?.characterType,
            inProgressCharacter?.level,
            'back',
          )
        }
        stickToTop
      >
        {/* 캘린더 */}
        <View style={{ height: 100 }}>
          <HomeWeekCalendar />
        </View>
        {/* 정보 */}
        <Animated.ScrollView
          style={{ flex: 1 }}
          ref={scrollViewRef}
          contentContainerStyle={{
            paddingHorizontal: DEFAULT_MARGIN,
            paddingTop: SCREEN_HEIGHT * 0.4, // 초기 스크롤 위치 조정
            paddingBottom: 20 + bottom, // 하단 여백 추가,
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true },
          )}
          scrollEventThrottle={16}
        >
          <Animated.View
            style={{
              transform: [{ translateY: infoTranslateY }],
            }}
          >
            {/* 프로필 보기 버튼 */}
            <L.Row justify="flex-end" mb={14}>
              <ChipButton
                text={'프로필 보기'}
                bgColor="LUCK_GREEN"
                onPress={handleViewProfile}
                iconName="arrow_right"
              />
            </L.Row>
            <L.Col
              style={{
                backgroundColor: '#00000099',
              }}
              h={SUCCESS_RATE_HEIGHT}
              rounded={15}
              mb={GAP}
              ph={25}
              pv={18}
            >
              <L.Row justify="space-between">
                {/* 달성율 */}
                <L.Col w={'100%'}>
                  <L.Row items="flex-end">
                    <Font type="LARGE_TITLE_BOLD" mr={4}>
                      {(luckkidsAchievementRate * 100).toFixed(0)}
                    </Font>
                    <Font type="TITLE1_BOLD" color="HOME_INFO_TEXT">
                      %
                    </Font>
                  </L.Row>
                  <Font type="SUBHEADLINE_SEMIBOLD" color="HOME_INFO_TEXT">
                    럭키즈 성장률
                  </Font>
                </L.Col>
                <L.Absolute r={0} b={0}>
                  <Tooltip
                    text={getLevelToolTipText(inProgressCharacter?.level || 0)}
                  />
                </L.Absolute>
              </L.Row>
              <L.Row w="100%" mt={14}>
                <L.Row>
                  <L.Col w={'100%'}>
                    <ProgressBar
                      progress={luckkidsAchievementRate}
                      height={14}
                      backgroundColor={'BLACK'}
                    />
                  </L.Col>
                </L.Row>
              </L.Row>
            </L.Col>
            <L.Row
              style={{
                backgroundColor: '#00000099',
              }}
              h={LUCKKIDS_HEIGHT}
              rounded={15}
            >
              {/* 내가 모은 럭키즈 */}
              <L.Col ph={25} pv={18}>
                <L.Row items="center">
                  <SvgIcon name="iconHomeLuckkids" size={30} />
                  <Font type="BODY_SEMIBOLD" color="WHITE" ml={8} mr={4}>
                    내가 모은
                  </Font>
                  <Font type="BODY_SEMIBOLD" color="LUCK_GREEN">
                    럭키즈
                  </Font>
                </L.Row>
                <L.Row
                  mt={10}
                  w={SCREEN_WIDTH - 2 * DEFAULT_MARGIN - 2 * 25}
                  justify="space-between"
                >
                  <L.Col g={13} items="center">
                    <Image
                      source={luckkidsCloud}
                      style={{
                        width: 45,
                        height: 45,
                      }}
                    />
                    <Font type="FOOTNOTE_SEMIBOLD" color="WHITE">
                      {
                        userCharacterSummaryResponse?.completedCharacterCount
                          .CLOUD
                      }
                    </Font>
                  </L.Col>
                  <L.Col g={13} items="center">
                    <Image
                      source={luckkidsWaterDrop}
                      style={{
                        width: 45,
                        height: 45,
                      }}
                    />
                    <Font type="FOOTNOTE_SEMIBOLD" color="WHITE">
                      {
                        userCharacterSummaryResponse?.completedCharacterCount
                          .STONE
                      }
                    </Font>
                  </L.Col>
                  <L.Col g={13} items="center">
                    <Image
                      source={luckkidsClover}
                      style={{
                        width: 45,
                        height: 45,
                      }}
                    />
                    <Font type="FOOTNOTE_SEMIBOLD" color="WHITE">
                      {
                        userCharacterSummaryResponse?.completedCharacterCount
                          .CLOVER
                      }
                    </Font>
                  </L.Col>
                  <L.Col g={13} items="center">
                    <Image
                      source={luckkidsSun}
                      style={{
                        width: 45,
                        height: 45,
                      }}
                    />
                    <Font type="FOOTNOTE_SEMIBOLD" color="WHITE">
                      {
                        userCharacterSummaryResponse?.completedCharacterCount
                          .SUN
                      }
                    </Font>
                  </L.Col>
                  <L.Col g={13} items="center">
                    <Image
                      source={luckkidsRabbit}
                      style={{
                        width: 45,
                        height: 45,
                      }}
                    />
                    <Font type="FOOTNOTE_SEMIBOLD" color="WHITE">
                      {
                        userCharacterSummaryResponse?.completedCharacterCount
                          .RABBIT
                      }
                    </Font>
                  </L.Col>
                </L.Row>
              </L.Col>
            </L.Row>
          </Animated.View>
        </Animated.ScrollView>
        {tooltipViewed === false && (
          <L.Absolute
            b={CONSTANTS.BOTTOM_TABBAR_HEIGHT + 8}
            l={SCREEN_WIDTH / 4 - 20}
            z={2}
          >
            <Tooltip
              text={'먼저, 행운의 습관을\n설정해주세요!'}
              bgColor="LUCK_GREEN"
              opacity={1}
              textColor="BLACK"
            />
          </L.Absolute>
        )}
      </FrameLayout>
    </>
  );
};

const SUCCESS_RATE_HEIGHT = 142;
const GAP = 8;
const LUCKKIDS_HEIGHT = 157;
