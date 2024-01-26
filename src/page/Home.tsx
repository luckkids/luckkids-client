import React, { useLayoutEffect, useRef } from 'react';
import {
  Animated,
  GestureResponderEvent,
  Image,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DEFAULT_MARGIN } from '@constants';
import { ChipButton, Font, L, SvgIcon } from '@design-system';
import HomeNavbar from '@components/page/home/home.navbar';
import HomeWeekCalendar from '@components/page/home/home.week.calendar';
import { FrameLayout } from '@frame/frame.layout';
import LoadingIndicator from '@global-components/common/LoadingIndicator/LoadingIndicator';
import useNavigationService from '@hooks/navigation/useNavigationService';
import ProgressBar from '@components/common/ProgressBar/ProgressBar';

const bgImage = require('assets/images/home-bg.png');
const luckkidsCloud = require('assets/images/luckkids-cloud.png');
const luckkidsWaterDrop = require('assets/images/luckkids-waterdrop.png');
const luckkidsClover = require('assets/images/luckkids-clover.png');
const luckkidsSun = require('assets/images/luckkids-sun.png');
const luckkidsRabbit = require('assets/images/luckkids-rabbit.png');

export const Home: React.FC = () => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigationService();
  const progressBarRef = useRef<View>(null);

  const handleViewProfile = (e: GestureResponderEvent) => {
    navigation.navigate('HomeProfile');
  };

  const animatedValue = useRef(new Animated.Value(0)).current;

  // 애니메이션을 위한 높이와 위치 계산
  const animatedHeight = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      SUCCESS_RATE_HEIGHT + GAP + LUCKKIDS_HEIGHT - INITIAL_HEIGHT_REDUCTION,
      SUCCESS_RATE_HEIGHT + GAP + LUCKKIDS_HEIGHT,
    ],
  });

  const animatedY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -INITIAL_HEIGHT_REDUCTION],
  });

  const openAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  useLayoutEffect(() => {
    LoadingIndicator.show({});
    setTimeout(() => {
      LoadingIndicator.hide();
    }, 500);
  }, []);

  return (
    <>
      <FrameLayout
        statusBarColor={'HOME_BG'}
        NavBar={<HomeNavbar />}
        backgroundImage={bgImage}
      >
        {/* 캘린더 */}
        <HomeWeekCalendar />
        {/* 캐릭터 메인 */}
        <L.Col justify={'center'} items={'center'} mt={100}>
          <L.Row
            w={SCREEN_WIDTH - 2 * CHARACTER_MARGIN}
            h={SCREEN_WIDTH - 2 * CHARACTER_MARGIN}
            bg={'LUCK_GREEN'}
          />
        </L.Col>
        {/* 정보 */}
        <View
          style={{
            flex: 1,
          }}
        >
          <TouchableWithoutFeedback
            style={{
              flex: 1,
            }}
            onPress={closeAnimation}
          >
            <Animated.View
              style={{
                height: animatedHeight,
                paddingHorizontal: DEFAULT_MARGIN,
                width: '100%',
                position: 'absolute',
                right: 0,
                left: 0,
                transform: [{ translateY: animatedY }],
              }}
              onTouchMove={openAnimation}
            >
              <L.Row justify="flex-end" mb={14}>
                <ChipButton
                  text={'프로필 보기'}
                  bgColor="LUCK_GREEN"
                  onPress={handleViewProfile}
                  iconName="arrow_right"
                />
              </L.Row>
              <L.Row
                style={{
                  backgroundColor: '#00000099',
                }}
                h={SUCCESS_RATE_HEIGHT}
                rounded={15}
                mb={GAP}
              >
                {/* 달성율 */}
                <L.Col ph={25} pv={18} w={'100%'}>
                  <L.Row items="flex-end">
                    <Font type="LARGE_TITLE_BOLD" mr={4}>
                      75
                    </Font>
                    <Font type="TITLE1_BOLD" color="HOME_INFO_TEXT">
                      %
                    </Font>
                  </L.Row>
                  <Font type="SUBHEADLINE_SEMIBOLD" color="HOME_INFO_TEXT">
                    럭키즈 달성율
                  </Font>
                  {/* TODO 프로그레스 바 */}
                  <L.Row mt={14}>
                    <L.Col w={'100%'}>
                      <ProgressBar
                        progress={0.5}
                        height={14}
                        backgroundColor={'BLACK'}
                      />
                    </L.Col>
                  </L.Row>
                </L.Col>
              </L.Row>
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
                        13
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
                        13
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
                        13
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
                        13
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
                        13
                      </Font>
                    </L.Col>
                  </L.Row>
                </L.Col>
              </L.Row>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </FrameLayout>
    </>
  );
};

const SUCCESS_RATE_HEIGHT = 142;
const GAP = 8;
const LUCKKIDS_HEIGHT = 157;
const INITIAL_HEIGHT_REDUCTION = 140;
const PROFILE_VIEW_BUTTON_HEIGHT = 36;

const LUCKKIDS_GAP = 23;

const CHARACTER_MARGIN = 62;
