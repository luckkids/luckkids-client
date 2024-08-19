import branch from 'react-native-branch';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  NavigationContainerRef,
  useNavigation,
} from '@react-navigation/native';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import { SvgIcon } from '@design-system';
import SnackBar from '@global-components/common/SnackBar/SnackBar';
import { createElement } from 'react';
import useNavigationService from '@hooks/navigation/useNavigationService';

export const DEEP_LINK_BASE_URL = 'luckkids://';

const onSnackBarHandler = () => {
  SnackBar.show({
    leftElement: createElement(SvgIcon, {
      name: 'lucky_check',
      size: 20,
    }),
    width: 185,
    title: `링크가 복사됐어요`,
    position: 'bottom',
  });
};

export type DeepLinkInfo = {
  type: 'FRIEND_INVITE';
  screenName: null;
  params: { code: string };
};

export function generateDeepLink(info: DeepLinkInfo): string {
  switch (info.type) {
    case 'FRIEND_INVITE':
      return `${DEEP_LINK_BASE_URL}friend-invite/${info.params.code}`;
    default:
      throw new Error('Unknown screen');
  }
}

//  ex) url : luckkids://friend-invite/CODE
export function parseDeepLink(url: string): DeepLinkInfo {
  // URL이 BASE_URL로 시작하는지 확인
  if (!url.startsWith(DEEP_LINK_BASE_URL)) {
    throw new Error('Invalid URL: Does not match BASE_URL');
  }

  // BASE_URL을 제거하고 경로만 추출
  const path = url.slice(DEEP_LINK_BASE_URL.length);

  const friendInviteMatch = path.match(/^\/friend-invite\/(\w+)$/);
  if (friendInviteMatch) {
    return {
      type: 'FRIEND_INVITE',
      screenName: null,
      params: { code: friendInviteMatch[1] },
    };
  }

  throw new Error('Unknown URL format');
}

export const createAndCopyBranchLink = async (
  code: string,
  nickName: string | null,
) => {
  try {
    const branchUniversalObject = await branch.createBranchUniversalObject(
      'friend_invite',
      {
        locallyIndex: true,
        title: 'LUCKKIDS : 행운을 키우는 습관앱, 럭키즈',
        contentDescription: '우리는 행운아! 행운을 키우지!',
        contentImageUrl:
          'https://cdn.branch.io/branch-assets/1723979173696-og_image.jpeg',
        contentMetadata: {
          customMetadata: { friendCode: code },
        },
      },
    );

    const controlParams = {
      $ios_url: `${DEEP_LINK_BASE_URL}friend-invite/${code}`,
    };

    const { url } = await branchUniversalObject.generateShortUrl(
      {},
      controlParams,
    );

    const chatBalloon = nickName
      ? `[Luckkids]\n럭키즈 | 💌 [띵동] ${nickName}님이 친구 요청을 보냈어요!\n링크를 누르고 함께 행운을 키워나가 보아요.\n`
      : `[Luckkids]\n럭키즈 | 💌 [띵동] 친구 요청이 도착했어요!\n링크를 누르고 함께 행운을 키워나가 보아요.\n`;

    // 클립보드에 URL 복사
    if (url) {
      Clipboard.setString(chatBalloon + url);
      BottomSheet.hide();
      onSnackBarHandler();
    }
    return;
  } catch (err) {
    console.error('Link creation or copying error', err);
  }
};

function extractFriendCodeFromUrl(url: string) {
  const match = url.match(/friend-invite\/(\w+)/);
  return match
    ? {
        type: 'FRIEND_INVITE',
        screenName: null,
        params: { code: match[1] },
      }
    : null;
}

export const subscribeBranch = (navigationRef: NavigationContainerRef<any>) => {
  const handleBranchUrl = (url: string) => {
    console.log('Handling Branch URL:', url);
    const friendCode = extractFriendCodeFromUrl(url);
    console.log('Extracted friendCode:', friendCode);
    if (friendCode) {
      if (navigationRef.isReady()) {
        console.log('Resetting navigation with params:', friendCode.params);
        /*navigationRef.reset({
          index: 0,
          routes: [{ name: 'Home', params: { code: friendCode.params.code } }],
        });*/
        navigationRef.navigate('Home', { code: friendCode.params.code });
        console.log('Current route:', navigationRef.getCurrentRoute());
        console.log('Navigation reset completed');
      } else {
        const checkNavReady = setInterval(() => {
          if (navigationRef.isReady()) {
            console.log('else==>', friendCode);
            clearInterval(checkNavReady);
            navigationRef.reset({
              index: 0,
              routes: [
                {
                  name: 'Home',
                  params: { code: friendCode.params.code },
                },
              ],
            });
          }
        }, 100);
      }
    } else {
      console.log('No friendCode found in URL');
    }
  };

  return branch.subscribe({
    onOpenStart: ({ uri, cachedInitialEvent }) => {
      console.log('Branch onOpenStart:', { uri, cachedInitialEvent });
    },
    onOpenComplete: ({ error, params, uri }) => {
      console.log('Branch onOpenComplete');
      if (error) {
        return console.log('onOpenComplete', error);
      }

      if (!params || params['+non_branch_link']) {
        if (params) {
          handleBranchUrl(params['+non_branch_link'] as string);
        }
      } else if (uri) {
        handleBranchUrl(uri);
      } else {
        console.log('No valid link found in Branch params');
      }
    },
  });
};
