// import API from './API'; // TODO: 실제 API 사용 시 주석 해제

import API from './API';

export type PopupButton = {
  bgColor: string; // 버튼 배경색
  link: string | null; // 버튼 링크
  text: string; // 버튼 텍스트
  textColor: string; // 버튼 텍스트 색상
};

export type PopupContent = {
  label: string; // 팝업 맨 위 라벨
  title: string; // 팝업 제목
  description: string; // 팝업 설명
  imageUrl: string | null; // 팝업 이미지
  buttons: PopupButton[]; // 팝업 버튼들
};

export type GetPopupResponse = PopupContent | null;

/**
 * 팝업 정보를 가져오는 API
 * @returns 팝업 정보 또는 null
 */
export const getPopup = async (): Promise<GetPopupResponse> => {
  const res = await API.get<GetPopupResponse>('/popup');
  return res.data;

  // 테스트용: 실제 데이터가 오는 것처럼 테스트 데이터 반환
  // 팝업이 있을 때와 없을 때를 테스트하려면 아래 주석을 해제/해제하여 테스트 가능
  return {
    label: '개운법 테스트 OPEN!',
    title: '내 운이 트이는 방법은?',
    description: '운이 트이는, 나만의 개운법(開運法)을\n지금 확인해보세요!',
    imageUrl: 'https://api-luckkids.kro.kr/api/v1/images/popup-test-sun.png', // 테스트용 이미지 URL (실제 이미지 URL로 변경 필요)
    buttons: [
      {
        bgColor: 'LUCK_GREEN',
        link: 'https://www.google.com',
        text: '테스트 시작하기',
        textColor: 'BLACK',
      },
      {
        bgColor: 'BG_TERTIARY',
        link: null,
        text: '다음에 보기',
        textColor: 'WHITE',
      },
    ],
  };

  // 팝업이 없을 때 테스트하려면 아래 주석 해제
  // return null;
};

export const popupApis = {
  getPopup,
};
