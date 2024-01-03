import React, { useState } from 'react';
import { DEFAULT_MARGIN } from '@constants';
import { ButtonText, SimpleTextInput, L } from '@design-system';
import StackNavbar from '@components/common/StackNavBar/StackNavBar';
import { FrameLayout } from '@frame/frame.layout';
import AlertPopup from '@global-components/common/AlertPopup/AlertPopup';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { useFetch } from '@hooks/useFetch';

export const PageHomeComment: React.FC = () => {
  const initialComment = '기존 행운 문구';
  const [comment, setComment] = useState(initialComment || '');
  const navigation = useNavigationService();

  const { onFetch: editComment } = useFetch({
    method: 'PATCH',
    url: '/user/phrase',
    value: {
      luckPhrases: comment,
    },
    onSuccessCallback: () => {
      //
    },
    onFailCallback: () => {
      //
    },
  });

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleSave = () => {
    if (comment === initialComment) return;
    else {
      AlertPopup.show({
        title: '저장할까요?',
        body: '바꾼 정보를 저장합니다.',
        yesText: '예',
        onPressYes: editComment,
        noText: '아니요',
      });
    }
  };

  return (
    <FrameLayout
      NavBar={
        <StackNavbar
          title="행운 문구 수정"
          RightComponent={
            <ButtonText
              onPress={handleSave}
              text="저장"
              textColor="LUCK_GREEN"
            />
          }
          useBackButton={false}
          LeftComponent={
            <ButtonText
              onPress={handleCancel}
              text="취소"
              textColor="LUCK_GREEN"
            />
          }
        />
      }
    >
      <L.Row mt={30} ph={DEFAULT_MARGIN}>
        <SimpleTextInput
          placeholder="행운 문구"
          text={comment}
          onChangeText={setComment}
        />
      </L.Row>
    </FrameLayout>
  );
};
