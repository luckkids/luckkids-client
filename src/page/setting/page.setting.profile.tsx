import React, { useState } from 'react';
import { Font, L, TextInputField } from '@design-system';
import ButtonText from '../../design-system/components/Button/ButtonText';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';

export const PageSettingProfile: React.FC = () => {
  const [text, setText] = useState<string>('');

  const navigation = useNavigationService();

  return (
    <FrameLayout
      NavBar={
        <L.Row pv={12} ph={16} justify={'space-between'}>
          <ButtonText
            onPress={() => console.log('cancel')}
            text={'취소'}
            fontType={'HEADLINE_SEMIBOLD'}
            textColor={'LUCK_GREEN'}
          />
          <Font type={'HEADLINE_SEMIBOLD'}>프로필 수정</Font>
          <ButtonText
            onPress={() => console.log('cancel')}
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
          placeholder="행운 문구 변경"
        />
      </L.Row>
    </FrameLayout>
  );
};
