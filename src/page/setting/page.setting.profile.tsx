import React, { useState } from 'react';
import styled from 'styled-components/native';
import { FrameLayout } from '@frame/frame.layout';
import { AppScreens, IPage } from '@types-common/page.types';
import { Font, L, TextInputField } from '@design-system';
import ButtonText from '../../design-system/components/Button/ButtonText';

const S = {
  Text: styled.Text({
    textAlign: 'center',
  }),
  Button: styled.Button({}),
};

export const PageSettingProfile: React.FC<IPage> = (props) => {
  const [text, setText] = useState<string>('');
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
