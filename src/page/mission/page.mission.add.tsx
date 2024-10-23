import React, { useState } from 'react';
import { FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import styled from 'styled-components/native';
import { DEFAULT_MARGIN } from '@constants';
import { Colors, Font, L, SvgIcon, TextInputField } from '@design-system';
import { useMissionList } from '@queries';
import ButtonText from '../../design-system/components/Button/ButtonText';
import { missionApis } from '@apis/mission';
import {
  IAddCategory,
  MissionAddCategory,
} from '@components/page/mission/mission.add.category';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';

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
  const [alertTime, setAlertTime] = useState('07:00:00');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [numColumns, setNumColumns] = useState<number>(4);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  const { refetch: refetchMissionData } = useMissionList();

  // 미션 생성
  const handleCreate = async () => {
    if (!currentCategory) return;
    const res = await missionApis.createMission({
      luckkidsMissionId: null,
      missionType: currentCategory,
      missionDescription: text,
      alertStatus: isDisabled ? 'UNCHECKED' : 'CHECKED',
      alertTime: alertTime,
    });

    if (res) {
      navigation.navigate('MissionRepair', {});
      refetchMissionData();
    }
  };

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (!selectedDate) return;

    const formattedTime = format(selectedDate, 'HH:mm:00');

    setAlertTime(formattedTime);
  };

  const isReadyToCreate = () => {
    if (!currentCategory) return false;
    if (text.length < 1) return false;
    if (isDisabled && !alertTime) return false;
    return true;
  };

  return (
    <FrameLayout
      NavBar={
        <L.Row pt={30} pb={12} ph={16} justify={'space-between'}>
          <ButtonText
            onPress={() => navigation.goBack()}
            text={'취소'}
            fontType={'HEADLINE_SEMIBOLD'}
            textColor={'LUCK_GREEN'}
          />
          <Font type={'HEADLINE_SEMIBOLD'}>새 습관</Font>
          <ButtonText
            onPress={handleCreate}
            fontType={'HEADLINE_SEMIBOLD'}
            text={'추가'}
            disabled={false}
            textColor={isReadyToCreate() ? 'LUCK_GREEN' : 'GREY3'}
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
              value={new Date(`2021-01-01T${alertTime}`)}
              is24Hour={false}
              display="spinner"
              mode={'time'}
              onChange={onChange}
              textColor={Colors.WHITE}
              disabled={isDisabled}
              minuteInterval={5}
              locale="ko"
            />
          </L.Col>
        </L.Col>
        <L.Col p={DEFAULT_MARGIN}>
          <L.Col p={DEFAULT_MARGIN} bg="BG_SECONDARY" rounded={12}>
            <Font type={'BODY_REGULAR'} color={'WHITE'}>
              습관 카테고리
            </Font>
            <L.Row>
              <ScrollView
                horizontal
                contentContainerStyle={{
                  width: '100%',
                }}
              >
                <FlatList
                  data={category}
                  horizontal={false}
                  columnWrapperStyle={{
                    justifyContent: 'flex-start',
                  }}
                  renderItem={({ item }) => {
                    return (
                      <L.Row
                        key={item.type}
                        w={`${100 / numColumns}%`}
                        justify={'center'}
                      >
                        <MissionAddCategory
                          {...item}
                          isActive={currentCategory === item.type}
                          onPress={() => setCurrentCategory(item.type)}
                        />
                      </L.Row>
                    );
                  }}
                  keyExtractor={(item) => item.type}
                  numColumns={numColumns}
                />
              </ScrollView>
            </L.Row>
          </L.Col>
        </L.Col>
      </ScrollView>
    </FrameLayout>
  );
};
