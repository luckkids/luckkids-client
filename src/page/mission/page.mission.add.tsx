import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Colors, Font, L, SvgIcon, TextInputField } from '@design-system';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { useFetch } from '@hooks/useFetch';
import ButtonText from '../../design-system/components/Button/ButtonText';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import { ScrollView, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { DEFAULT_MARGIN } from '@constants';
import {
  IAddCategory,
  MissionAddCategory,
} from '@components/page/mission/mission.add.category';

const category: Array<IAddCategory> = [
  {
    label: '집 정돈',
    icon: 'iconAddCategoryHouseKeeping',
    type: 'HOUSEKEEPING',
  },
  {
    label: '셀프케어',
    icon: 'iconAddCategorySelfCare',
    type: 'SELF_CARE',
  },
  {
    label: '건강',
    icon: 'iconAddCategoryHealth',
    type: 'HEALTH',
  },
  {
    label: '일',
    icon: 'iconAddCategoryWork',
    type: 'WORK',
  },
  {
    label: '마인드셋',
    icon: 'iconAddCategoryMineSet',
    type: 'MINDSET',
  },
  {
    label: '자기계발',
    icon: 'iconAddCategorySelfDevelopment',
    type: 'SELF_DEVELOPMENT',
  },
];

const S = {
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
  disabledButton: styled.View({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DEFAULT_MARGIN,
  }),
};

export const PageMissionAdd: React.FC = () => {
  const navigation = useNavigationService();
  const [date, setDate] = useState(new Date(1598051730000));
  const [rtnTime, setRtnTime] = useState<string>('');
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [text, setText] = useState<string>('');
  const [current, setCurrent] = useState<number>(0);
  const { onFetch } = useFetch({
    method: 'POST',
    url: '/missions/new',
    value: {
      missionType: category[current].type,
      missionDescription: text,
      alertStatus: isDisabled ? 'UNCHECKED' : 'CHECKED',
      alertTime: rtnTime,
    },
  });

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);

    const tempDate = new Date(currentDate);
    /*const fTime = `${
      tempDate.getHours() < 12 ? '오전' : '오후'
    } ${tempDate.getHours()}${tempDate.getMinutes()}`;*/
    const fTime = `${
      tempDate.getHours() < 10 ? `0${tempDate.getHours()}` : tempDate.getHours()
    }:${tempDate.getMinutes()}:${tempDate.getSeconds()}`;
    console.log('time =======>', tempDate);
    setRtnTime(fTime);
  };

  // 00:00:00
  // 08:17:23

  useEffect(() => {
    // onFetch();
  }, []);
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
          <Font type={'HEADLINE_SEMIBOLD'}>새 습관</Font>
          <ButtonText
            onPress={() => {
              console.log('texttext');
              onFetch();
            }}
            fontType={'HEADLINE_SEMIBOLD'}
            text={'추가'}
            disabled={false}
            textColor={!isAdd ? 'GREY3' : 'LUCK_GREEN'}
          />
        </L.Row>
      }
    >
      <ScrollView>
        <L.Row ph={DEFAULT_MARGIN} mt={30}>
          <TextInputField
            text={text}
            onChangeText={setText}
            placeholder={'추가할 습관명 입력'}
            bg={'BG_SECONDARY'}
          />
        </L.Row>
        <L.Col ph={DEFAULT_MARGIN} mt={12}>
          <L.Col
            pv={DEFAULT_MARGIN}
            bg={'BG_SECONDARY'}
            style={{ borderRadius: 12, width: '100%' }}
          >
            <TouchableWithoutFeedback
              onPress={() => setIsDisabled(!isDisabled)}
            >
              <S.disabledButton>
                <Font
                  type={'BODY_REGULAR'}
                  color={!isDisabled ? 'GREY1' : 'WHITE'}
                >
                  알림끄기
                </Font>
                <L.Row ml={12}>
                  <SvgIcon
                    name={
                      !isDisabled ? 'iconCheckAlarmOff' : 'iconCheckAlarmOn'
                    }
                    size={10}
                  />
                </L.Row>
              </S.disabledButton>
            </TouchableWithoutFeedback>
            <DateTimePicker
              style={{
                width: '100%',
              }}
              testID="dateTimePicker"
              value={date}
              is24Hour={false}
              display="spinner"
              mode={'time'}
              onChange={onChange}
              textColor={Colors.WHITE}
              disabled={isDisabled}
            />
          </L.Col>
        </L.Col>
        <L.Col p={DEFAULT_MARGIN}>
          <L.Col
            p={DEFAULT_MARGIN}
            bg={'BG_SECONDARY'}
            style={{ borderRadius: 12 }}
          >
            <Font type={'BODY_REGULAR'} color={'WHITE'}>
              습관 카테고리
            </Font>
            <L.Row g={11} style={{ flexWrap: 'wrap' }}>
              {category.map((item, i) => {
                return (
                  <MissionAddCategory
                    {...item}
                    key={i}
                    isActive={current === i}
                    onPress={() => setCurrent(i)}
                  />
                );
              })}
            </L.Row>
          </L.Col>
        </L.Col>
      </ScrollView>
    </FrameLayout>
  );
};
