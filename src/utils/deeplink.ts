// 기본 URL을 정의합니다. 실제 앱의 URL로 변경해주세요.
export const DEEP_LINK_BASE_URL = 'luckkids://';

type DeepLinkInfo = {
  type: 'FRIEND_INVITE';
  screenName: null;
  params: { code: string };
};

export function generateDeepLink(info: DeepLinkInfo): string {
  switch (info.type) {
    case 'FRIEND_INVITE':
      return `${DEEP_LINK_BASE_URL}/friend-invite/${info.params.code}`;
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
