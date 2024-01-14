import React, { useLayoutEffect, useRef } from 'react';
import { Animated, TouchableWithoutFeedback, View } from 'react-native';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DEFAULT_MARGIN } from '@constants';
import { Font, L, SvgIcon } from '@design-system';
import HomeNavbar from '@components/page/home/home.navbar';
import HomeWeekCalendar from '@components/page/home/home.week.calendar';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';
import LoadingIndicator from '@global-components/common/LoadingIndicator/LoadingIndicator';

const bgImage = require('assets/images/home-bg.png');

export const Home: React.FC = () => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigationService();

  const handleEditComment = () => {
    navigation.navigate('HomeComment');
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
    outputRange: [50, -INITIAL_HEIGHT_REDUCTION + 30],
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
          <TouchableWithoutFeedback onPress={handleEditComment}>
            <Font type="BODY_SEMIBOLD">행운 문구 수정</Font>
          </TouchableWithoutFeedback>
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
              onTouchStart={openAnimation}
            >
              <L.Row
                style={{
                  backgroundColor: '#00000099',
                }}
                h={SUCCESS_RATE_HEIGHT}
                rounded={15}
                mb={GAP}
              >
                {/* 달성율 */}
                <L.Col ph={25} pv={18}>
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

const CHARACTER_MARGIN = 62;
