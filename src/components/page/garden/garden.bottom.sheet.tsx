import { useEffect, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Share, { ShareOptions } from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import styled from 'styled-components/native';
import { Button, Colors, Font, SvgIcon } from '@design-system';
import { useMe } from '@queries';
import { createAndCopyBranchLink } from '@utils';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import { useFetch } from '@hooks/useFetch';

const S = {
  popupWrap: styled.View({
    backgroundColor: Colors.BG_SECONDARY,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingBottom: 30,
    paddingHorizontal: 25,
  }),
  popupItemContainer: styled.View({
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  popupItemWrap: styled.View({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }),
  popupItemLogo: styled.View({
    width: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.GREY4,
    borderRadius: 50,
  }),
  buttonWrap: styled.View({
    marginTop: 35,
  }),
};

export default function GardenBottomSheet() {
  const [code, setCode] = useState<string>('');

  useEffect(() => {
    onFetch();
  }, []);

  const { onFetch } = useFetch({
    method: 'GET',
    url: '/friendcode',
    value: {},
    onSuccessCallback: (rtn) => {
      setCode(rtn.code);
    },
  });

  const Me = useMe().data;


  const onShare = async () => {
    try {
      const branchData = await createAndCopyBranchLink(code, Me ? Me.nickname : null);
      if (branchData) {

        const shareOptions:ShareOptions = {
          activityItemSources:[
            {
              placeholderItem: {
                type: 'url',
                content: branchData.url,
              },
              item: {
                default: {
                  type: 'text',
                  content: branchData.message + branchData.url,
                },
              },
              linkMetadata: {
                title:branchData.message,
                icon: branchData.icon,
              },
            },
          ],
        };

        const ShareResponse = await Share.open(shareOptions);
        console.log(JSON.stringify(ShareResponse));
      }
    } catch (error) {
      console.log('Error => ', error);
    }
  };

  return (
    <S.popupWrap>
      <Font type={'HEADLINE_SEMIBOLD'} style={{ marginBottom: 10 }}>
        친구를 어떻게 부를까요?
      </Font>
      <TouchableWithoutFeedback onPress={() => onShare()}>
        <S.popupItemContainer>
          <S.popupItemWrap>
            <S.popupItemLogo style={{ backgroundColor: Colors.KAKAO_YELLOW }}>
              <SvgIcon name={'iconKakao'} size={20} />
            </S.popupItemLogo>
            <Font type={'BODY_REGULAR'} style={{ marginLeft: 16 }}>
              카카오톡 열기
            </Font>
          </S.popupItemWrap>
          <SvgIcon name={'arrow_right_gray'} size={8} />
        </S.popupItemContainer>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => createAndCopyBranchLink(code, Me ? Me.nickname : null)}
      >
        <S.popupItemContainer>
          <S.popupItemWrap>
            <S.popupItemLogo>
              <SvgIcon name={'iconClip'} size={20} />
            </S.popupItemLogo>
            <Font type={'BODY_REGULAR'} style={{ marginLeft: 16 }}>
              초대 링크 복사
            </Font>
          </S.popupItemWrap>
          <SvgIcon name={'arrow_right_gray'} size={8} />
        </S.popupItemContainer>
      </TouchableWithoutFeedback>
      {/*<KakaoShareableLinkPreview url="https://example.com" />*/}
      <S.buttonWrap>
        <Button
          type={'action'}
          text={'닫기'}
          bgColor={'LUCK_GREEN'}
          onPress={BottomSheet.hide}
        />
      </S.buttonWrap>
    </S.popupWrap>
  );
}
