import React, { useLayoutEffect, useRef } from 'react';
import {
  Animated,
  GestureResponderEvent,
  Image,
  ScrollView,
  View,
} from 'react-native';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { DEFAULT_MARGIN } from '@constants';
import { ChipButton, Font, L, SvgIcon } from '@design-system';
import ProgressBar from '@components/common/ProgressBar/ProgressBar';
import HomeNavbar from '@components/page/home/home.navbar';
import HomeWeekCalendar from '@components/page/home/home.week.calendar';
import { FrameLayout } from '@frame/frame.layout';
import LoadingIndicator from '@global-components/common/LoadingIndicator/LoadingIndicator';
import useNavigationService from '@hooks/navigation/useNavigationService';
import Tooltip from '@components/common/Tooltip/Tooltip';

const bgImage = require('assets/images/home-bg.png');
const luckkidsCloud = require('assets/images/luckkids-cloud.png');
const luckkidsClover = require('assets/images/luckkids-clover.png');
const luckkidsRabbit = require('assets/images/luckkids-rabbit.png');
const luckkidsSun = require('assets/images/luckkids-sun.png');
const luckkidsWaterDrop = require('assets/images/luckkids-waterdrop.png');

export const Home: React.FC = () => {
  const navigation = useNavigationService();
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
        <ScrollView
          style={{
            flex: 1,
            overflow: 'visible',
          }}
          // TODO(Gina): fix with reasonable value
          contentContainerStyle={{
            marginBottom: 100,
            paddingBottom: 420,
          }}
        >
          <View>
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
            >
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
                        75
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
                    <Tooltip text="한 단계 남았어요" />
                  </L.Absolute>
                </L.Row>
                <L.Row w="100%" mt={14}>
                  <L.Row>
                    <L.Col w={'100%'}>
                      <ProgressBar
                        progress={0.5}
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
          </View>
        </ScrollView>
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
