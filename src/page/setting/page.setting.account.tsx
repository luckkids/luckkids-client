import React, { useEffect, useMemo, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { Button, Font, L } from '@design-system';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';

const S = {
  itemWrap: styled.View({
    paddingHorizontal: 25,
    paddingVertical: 20,
  }),
};

const accountText = [
  '잘 사용하지 않는 앱이에요',
  '사용하기 어려워요',
  '알림이 너무 많이 와요',
  '오류가 생겼어요',
  '기타',
];

export const PageSettingAccount: React.FC = () => {
  const navigation = useNavigationService();
  const tempArray = [0, 0, 0, 0, 0];
  const [index, setIndex] = useState<number>(0);
  useEffect(() => {}, [index]);

  const accountListItem = useMemo(() => {
    tempArray[index] = 1;
    return accountText.map((item, i) => {
      if (tempArray[i] === 1) {
        return (
          <S.itemWrap key={i}>
            <Font type={'BODY_REGULAR'} color={'LUCK_GREEN'}>
              {item}
            </Font>
          </S.itemWrap>
        );
      } else {
        return (
          <TouchableWithoutFeedback
            key={i}
            onPress={() => {
              setIndex(i);
              console.log(tempArray);
            }}
          >
            <S.itemWrap>
              <Font type={'BODY_REGULAR'} color={'WHITE'}>
                {item}
              </Font>
            </S.itemWrap>
          </TouchableWithoutFeedback>
        );
      }
    });
  }, [tempArray, index]);
  return (
    <FrameLayout NavBar={`<StackNavBar title={'탈퇴하기'} useBackButton />`}>
      <L.Col>{accountListItem}</L.Col>
      <L.Col g={10} w={'100%'} ph={25}>
        <L.Row w={'100%'}>
          <Button
            type={'action'}
            text={'제출'}
            bgColor={'LUCK_GREEN'}
            sizing={'stretch'}
            status={tempArray.includes(1) ? 'normal' : 'disabled'}
            onPress={() => navigation.navigate('Login')}
          />
        </L.Row>
        <L.Row w={'100%'}>
          <Button
            type={'action'}
            text={'취소'}
            sizing={'stretch'}
            bgColor={'TRANSPARENT'}
            outline={'LUCK_GREEN'}
            textColor={'LUCK_GREEN'}
            onPress={() => navigation.navigate('Setting')}
          />
        </L.Row>
      </L.Col>
    </FrameLayout>
  );
};
