import React, {useState} from 'react';
import styled from 'styled-components/native';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { Button, L } from '@design-system';
import { PageSetting } from '@page/setting/page.setting';
import { DataStackScreen } from '../../data/data.stack.screen';
import StackNavBar from '@components/common/StackNavBar/StackNavBar';
import {TouchableWithoutFeedback} from "react-native";

const S = {
  Text: styled.Text({
    textAlign: 'center',
  }),
  Button: styled.Button({}),
};

const accountList = [
  '잘 사용하지 않는 앱이에요',
  '사용하기 어려워요',
  '알림이 너무 많이 와요',
  '오류가 생겼어요',
  '기타',
];

export const PageSettingAccount: React.FC = () => {
  const navigation = useNavigationService();
  const [active,setActive] = useState<Array<boolean>>([false,false,false,false,false]);
  return (
    <FrameLayout NavBar={<StackNavBar title={'탈퇴하기'} useBackButton />}>
        <L.Col>
            {accountList.map((item,i)=>{
                return <TouchableWithoutFeedback onPress={()}>

                </TouchableWithoutFeedback>
            })}
        </L.Col>
      <L.Col g={10} w={'100%'} ph={25}>
        <L.Row w={'100%'}>
          <Button
            type={'action'}
            text={'제출'}
            bgColor={'LUCK_GREEN'}
            sizing={'stretch'}
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
