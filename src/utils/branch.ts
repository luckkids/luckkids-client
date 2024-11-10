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
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import SnackBar from '@global-components/common/SnackBar/SnackBar';
import { AppScreensParamList } from '@types-common/page.types';

const BASE_URL = 'luckkids://';

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
): Promise<boolean> => {
  try {
    const processedCode = await AsyncStorage.getItem(
      `processed_invite_${code}`,
    );
    return !!processedCode;
  } catch (error) {
    console.error('Error checking processed invite:', error);
    return false;
  }
};

// 초대 코드를 처리 완료로 마크하는 함수
export const markInviteAsProcessed = async (code: string) => {
  try {
    await AsyncStorage.setItem(`processed_invite_${code}`, 'true');
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
      // 이미 처리된 초대 코드인지 확인
      const isProcessed = await checkIfInviteProcessed(friendCode.params.code);
      if (isProcessed) {
        console.log(
          'This invite code was already processed:',
          friendCode.params.code,
        );
        return;
      }

      if (!navigationRef.isReady()) {
        console.log('Navigation not ready');
        return;
      }

      const currentRoute = navigationRef.getCurrentRoute();
      console.log('3. Current route:', currentRoute?.name);

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
        console.log('4. Not on Home screen, replacing with Home screen');
        navigationRef.dispatch(
          StackActions.replace('Home', {
            friendCode: friendCode.params.code,
          }),
        );
      }

      // params 전달 확인을 위한 타임아웃 설정
      setTimeout(() => {
        const updatedRoute = navigationRef.getCurrentRoute();
        console.log('5. Route after update:', {
          screen: updatedRoute?.name,
          params: updatedRoute?.params,
        });

        // params가 없는 경우 보조 시도
        if (!(updatedRoute?.params as { friendCode?: string })?.friendCode) {
          console.log('6. Attempting secondary navigation...');
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
