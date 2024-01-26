import React, { useState } from 'react';
import { Font, L, TextInputField } from '@design-system';
import ButtonText from '../../design-system/components/Button/ButtonText';
import { FrameLayout } from '@frame/frame.layout';
import { useFetch } from '@hooks/useFetch';
import useNavigationService from '@hooks/navigation/useNavigationService';

export const PageSettingComment: React.FC = () => {
  const navigation = useNavigationService();
  const [text, setText] = useState<string>('');
  const { onFetch, isSuccess } = useFetch({
    method: 'PATCH',
    url: '/user/phrase',
    value: {
      luckPhrases: text,
    },
    onSuccessCallback: () => {
      navigation.goBack();
    },
  });
  return (
    <FrameLayout
      NavBar={
        <L.Row pv={12} ph={16} justify={'space-between'}>
          <ButtonText
            onPress={() => navigation.goBack()}
            text={'취소'}
            fontType={'HEADLINE_SEMIBOLD'}
            textColor={'LUCK_GREEN'}
          />
          <Font type={'HEADLINE_SEMIBOLD'}>행운 문구 수정</Font>
          <ButtonText
            onPress={() => onFetch()}
            fontType={'HEADLINE_SEMIBOLD'}
            text={'저장'}
            textColor={'LUCK_GREEN'}
          />
        </L.Row>
      }
    >
      <L.Row ph={25} mt={30}>
        <TextInputField
          text={text}
          onChangeText={setText}
          placeholder="행운 문구"
        />
      </L.Row>
    </FrameLayout>
  );
};
