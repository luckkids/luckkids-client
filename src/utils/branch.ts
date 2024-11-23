import { createElement } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  CommonActions,
  NavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import { debounce } from 'lodash';
import branch from 'react-native-branch';
import { SvgIcon } from '@design-system';
import AlertPopup from '@global-components/common/AlertPopup/AlertPopup';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import SnackBar from '@global-components/common/SnackBar/SnackBar';
import { AppScreensParamList } from '@types-common/page.types';

const BASE_URL = 'luckkids://';

const FRIEND_PENDING_KEY = 'friend_invite_pending';

export enum FRIEND_CODE_PENDING_ACTION {
  SAVE,
  REMOVE,
}

export enum POPUP_FRIEND_STATUS {
  ME = 'me',
  FRIEND = 'friend',
  NEGATIVE = 'negative',
  ALREADY = 'already',
}

const onSnackBarHandler = () => {
  SnackBar.show({
    leftElement: createElement(SvgIcon, {
      name: 'lucky_check',
      size: 20,
    }),
    width: 185,
    title: '링크가 복사됐어요!',
    position: 'bottom',
    rounded: 25,
    offsetY: 52 + 24,
  });
};

export const createAndCopyBranchLink = async (
  code: string,
  nickName: string | null,
) => {
  const ImgUrl =
    'https://info-luckkids.netlify.app/img/luckkids-invite-share.png';
  try {
    const branchUniversalObject = await branch.createBranchUniversalObject(
      'friend_invite',
      {
        locallyIndex: true,
        title: 'LUCKKIDS : 행운을 키우는 습관앱, 럭키즈',
        contentDescription: '우리는 행운아! 행운을 키우지!',
        contentImageUrl: ImgUrl,
        publiclyIndex: true, // 검색엔진 인덱싱 허용
        contentMetadata: {
          customMetadata: { friendCode: code },
        },
      },
    );

    const controlParams = {
      $ios_url: `${BASE_URL}friend-invite/${code}`,
    };

    const { url } = await branchUniversalObject.generateShortUrl(
      {},
      controlParams,
    );

    const chatBalloon = nickName
      ? `[luckkids]\n럭키즈 | 💌 [띵동] ${nickName}님이 친구 요청을 보냈어요!\n링크를 누르고 함께 행운을 키워나가 보아요.\n`
      : `[luckkids]\n럭키즈 | 💌 [띵동] 친구 요청이 도착했어요!\n링크를 누르고 함께 행운을 키워나가 보아요.\n`;

    if (url) {
      Clipboard.setString(chatBalloon + url);
      onSnackBarHandler();
      BottomSheet.hide();
    }
    return { url, message: chatBalloon, icon: ImgUrl };
  } catch (err) {
    console.error('Link creation or copying error', err);
  }
};

function extractFriendCodeFromUrl(url: string) {
  const match = url.match(/friend-invite\/(\w+)/);
  return match
    ? {
        type: 'FRIEND_INVITE',
        screenName: 'Home',
        params: { code: match[1] },
      }
    : null;
}

// 초대 코드 처리 여부를 확인하는 함수
export const checkIfInviteProcessed = async (
  code: string,
): Promise<string | null> => {
  try {
    const processedCode = await AsyncStorage.getItem(
      `processed_invite_${code}`,
    );
    if (processedCode !== null) {
      return processedCode;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error checking processed invite:', error);
    return null;
  }
};

export const pendingInviteProcessed = async (
  code: string,
  action: FRIEND_CODE_PENDING_ACTION,
) => {
  if (action === FRIEND_CODE_PENDING_ACTION.SAVE) {
    try {
      await AsyncStorage.setItem(FRIEND_PENDING_KEY, code);
    } catch (error) {
      console.log('invite Pending Set Processed:', error);
    }
  } else {
    try {
      await AsyncStorage.removeItem(FRIEND_PENDING_KEY);
    } catch (error) {
      console.log('invite Pending Remove Processed:', error);
    }
  }
};

export const checkPendingInviteProcessed = async (): Promise<string | null> => {
  try {
    const pendingCode = await AsyncStorage.getItem(FRIEND_PENDING_KEY);
    if (pendingCode) {
      return pendingCode;
    }
    return null;
  } catch (error) {
    console.log('invite Pending Processed:', error);
    return null;
  }
};

// 초대 코드 상태값 저장 함수
export const markInviteAsProcessed = async (
  code: string,
  state: POPUP_FRIEND_STATUS,
) => {
  try {
    await AsyncStorage.setItem(`processed_invite_${code}`, state);
    console.log(`Invite code ${code} marked as processed`);
  } catch (error) {
    console.error('Error marking invite as processed:', error);
  }
};

export const subscribeBranch = (
  navigationRef: NavigationContainerRef<AppScreensParamList>,
) => {
  const handleBranchUrl = debounce(async (url: string) => {
    console.log('=========== Branch Navigation Debug ===========');
    console.log('1. URL being handled:', url);

    const friendCode = extractFriendCodeFromUrl(url);
    console.log('2. Extracted friend code:', friendCode);

    if (!friendCode?.params?.code) {
      console.log('No valid friend code found in Branch params');
      return;
    }

    try {
      const currentRoute = navigationRef.getCurrentRoute();
      // 코드 STATE 체크
      const isProcessed = await checkIfInviteProcessed(friendCode.params.code);
      console.log('3. Friend code State:', isProcessed);

      if (
        currentRoute?.name.includes('Login') ||
        currentRoute?.name.includes('Tutorial')
      ) {
        return AlertPopup.show({
          title: currentRoute?.name.includes('Login')
            ? '로그인 후 다시 시도해 주세요.'
            : '튜토리얼을 모두 진행 후 다시 시도해 주세요.',
          yesText: '확인',
        });
      }

      if (isProcessed === POPUP_FRIEND_STATUS.NEGATIVE) {
        return AlertPopup.show({
          title: '이전에 거절했던 초대예요.\n친구 초대를 다시 요청해주세요!',
          yesText: '확인',
        });
      }

      if (!navigationRef.isReady()) {
        console.log('Navigation not ready');
        return;
      }

      console.log('4. Current route:', currentRoute?.name);

      // Home 화면인 경우 params만 업데이트
      if (currentRoute?.name === 'Home') {
        console.log('4. Currently on Home screen, updating params only');
        navigationRef.dispatch(
          CommonActions.setParams({
            friendCode: friendCode.params.code,
          }),
        );
      }
      // 다른 화면인 경우 기존 로직대로 처리
      else {
        console.log('5. Not on Home screen, replacing with Home screen');
        navigationRef.dispatch(
          StackActions.replace('Home', {
            friendCode: friendCode.params.code,
          }),
        );
      }

      // params 전달 확인을 위한 타임아웃 설정
      setTimeout(() => {
        const updatedRoute = navigationRef.getCurrentRoute();
        console.log('6. Route after update:', {
          screen: updatedRoute?.name,
          params: updatedRoute?.params,
        });

        // params가 없는 경우 보조 시도
        if (!(updatedRoute?.params as { friendCode?: string })?.friendCode) {
          console.log('7. Attempting secondary navigation...');
          navigationRef.dispatch(
            CommonActions.setParams({
              friendCode: friendCode.params.code,
            }),
          );
        }
      }, 100);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }, 300);

  return branch.subscribe({
    onOpenComplete: ({ error, params, uri }) => {
      console.log('Branch onOpenComplete:', { error, params, uri });

      if (error) {
        console.error('Branch onOpenComplete error:', error);
        return;
      }

      if (uri) {
        handleBranchUrl(uri);
      } else if (params?.['+non_branch_link']) {
        handleBranchUrl(params['+non_branch_link'] as string);
      }
    },
  });
};
