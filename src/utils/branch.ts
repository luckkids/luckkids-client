import { createElement } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import { NavigationContainerRef } from '@react-navigation/native';
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
    title: `링크가 복사됐어요`,
    position: 'bottom',
    styles: {
      titleContainer: {
        flex: 0,
        paddingHorizontal: 4,
      },
    },
  });
};

export const createAndCopyBranchLink = async (
  code: string,
  nickName: string | null,
) => {
  const ImgUrl =
    'https://cdn.branch.io/branch-assets/1723979173696-og_image.jpeg';
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
      ? `[Luckkids]\n럭키즈 | 💌 [띵동] ${nickName}님이 친구 요청을 보냈어요!\n링크를 누르고 함께 행운을 키워나가 보아요.\n`
      : `[Luckkids]\n럭키즈 | 💌 [띵동] 친구 요청이 도착했어요!\n링크를 누르고 함께 행운을 키워나가 보아요.\n`;

    if (url) {
      Clipboard.setString(chatBalloon + url);
      BottomSheet.hide();
      onSnackBarHandler();
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

export const subscribeBranch = (
  navigationRef: NavigationContainerRef<AppScreensParamList>,
) => {
  const handleBranchUrl = debounce((url: string) => {
    console.log('Handling Branch params:', url);

    const friendCode = extractFriendCodeFromUrl(url);

    console.log('Friend Code:', friendCode);

    if (friendCode?.params && navigationRef.isReady()) {
      console.log('Friend Code:', friendCode.params.code);

      navigationRef.navigate('Home', {
        friendCode: friendCode.params.code,
      });
    } else {
      console.log('No valid friend code found in Branch params');
    }
  }, 300);

  return branch.subscribe({
    onOpenStart: ({ uri, cachedInitialEvent }) => {
      console.log('Branch onOpenStart:', { uri, cachedInitialEvent });
    },
    onOpenComplete: ({ error, params, uri }) => {
      if (error) {
        console.error('Branch onOpenComplete error:', error);
        return;
      }

      if (!params || params['+non_branch_link']) {
        if (params) {
          handleBranchUrl(params['+non_branch_link'] as string);
        }
      }

      if (uri) {
        handleBranchUrl(uri);
      } else {
        console.log('No valid link found in Branch params');
      }
    },
  });
};
