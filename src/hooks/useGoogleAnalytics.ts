import analytics from '@react-native-firebase/analytics';

type Analytics = {
  // 페이지 조회
  VIEW_PAGE: {
    screen_name: string; // 스크린 이름
    duration?: number; // 페이지 조회 시간
  };
  // 앱 이탈
  EXIT_APP: {
    screen_name: string; // 스크린 이름
  };
  // 습관 추가
  ADD_LUCKKIDS_MISSION: {
    category: string; // 습관 카테고리
  };
  // 친구를 초대할게요! 버튼 클릭
  INVITE_FRIEND: undefined;
  // 친구 초대 > 링크 공유
  INVITE_FRIEND_SHARE_LINK: undefined;
  // 친구 초대 > 링크 복사
  INVITE_FRIEND_COPY_LINK: undefined;
};

interface AnalyticsEventProps<T extends keyof Analytics> {
  eventName: T;
  params?: Analytics[T];
}

interface ScreenViewParams {
  screen_name: string;
  screen_class?: string;
}

const useGoogleAnalytics = () => {
  const logEvent = async <T extends keyof Analytics>({
    eventName,
    params,
  }: AnalyticsEventProps<T>) => {
    try {
      await analytics().logEvent(eventName, params);
      console.log('Analytics event logged:', eventName, params);
    } catch (error) {
      console.error('Analytics error:', error);
    }
  };

  const logScreenView = async (screenName: string, screenClass?: string) => {
    try {
      const params: ScreenViewParams = {
        screen_name: screenName,
        screen_class: screenClass || screenName,
      };
      await analytics().logScreenView(params);
      console.log('Screen view logged:', params);
    } catch (error) {
      console.error('Screen tracking error:', error);
    }
  };

  const setUserProperty = async (name: string, value: string) => {
    try {
      await analytics().setUserProperty(name, value);
      console.log('User property set:', name, value);
    } catch (error) {
      console.error('Set user property error:', error);
    }
  };

  return {
    logEvent,
    logScreenView,
    setUserProperty,
  };
};

export default useGoogleAnalytics;
