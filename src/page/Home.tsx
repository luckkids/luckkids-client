import React, { useEffect, useLayoutEffect, useRef } from 'react';
import {
  Animated,
  GestureResponderEvent,
  Image,
  ScrollView,
  View,
} from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { DEFAULT_MARGIN } from '@constants';
import { ChipButton, Font, L, SvgIcon } from '@design-system';
import { useHomeInfo } from '@queries';
import { getCharacterImage, getLevelToolTipText } from '@utils';
import ProgressBar from '@components/common/ProgressBar/ProgressBar';
import Tooltip from '@components/common/Tooltip/Tooltip';
import HomeNavbar from '@components/page/home/home.navbar';
import HomeWeekCalendar from '@components/page/home/home.week.calendar';
import { FrameLayout } from '@frame/frame.layout';
import LoadingIndicator from '@global-components/common/LoadingIndicator/LoadingIndicator';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useFocusEffect } from '@react-navigation/native';

const luckkidsCloud = require('assets/images/luckkids-cloud.png');
const luckkidsClover = require('assets/images/luckkids-clover.png');
const luckkidsRabbit = require('assets/images/luckkids-rabbit.png');
const luckkidsSun = require('assets/images/luckkids-sun.png');
const luckkidsWaterDrop = require('assets/images/luckkids-waterdrop.png');

type RootStackParamList = {
  Home: { friendCode?: string };
};

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type HomeProps = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

export const Home: React.FC<HomeProps> = ({ route }) => {
  const navigationService = useNavigationService();
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const { bottom } = useSafeAreaInsets();

  useEffect(() => {
    console.log('route-->', route);
  }, [route.params]);

  // const { friendCode } = route.params || {};
  // console.log('HOME friendCode:', friendCode);

  /*useEffect(() => {
    if (friendCode) {
      console.log('Received friendCode:', friendCode);
    }
  }, [friendCode]);*/

  // 기존의 useEffect 로직
  /*useEffect(() => {
    console.log('Route params:', route.params);
    console.log('Navigation state:', navigation.getState());
  }, [route.params, navigation]);*/

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

  const { data: homeInfo } = useHomeInfo();
  const { luckkidsAchievementRate = 0, userCharacterSummaryResponse } =
    homeInfo || {};
  const { inProgressCharacter } = userCharacterSummaryResponse || {};

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
        paddingBottom={0}
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
                    럭키즈 달성율
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
      </FrameLayout>
    </>
  );
};

const SUCCESS_RATE_HEIGHT = 142;
const GAP = 8;
const LUCKKIDS_HEIGHT = 157;
