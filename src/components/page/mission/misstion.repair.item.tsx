import React, { useCallback, useEffect, useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import styled from 'styled-components/native';
import { Button, Colors, Font, L, SvgIcon } from '@design-system';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import { useFetch } from '@hooks/useFetch';
import { IMissionDataItem } from '@types-common/page.types';

interface IProps extends IMissionDataItem {
  isCheck?: boolean;
  isSwipeOpen?: boolean;
}

const S = {
  description: styled.View({}),
};
export const MissionRepairItem: React.FC<IProps> = ({
  missionDescription,
  id,
  alertTime,
  missionType,
  isCheck,
}) => {
  const [date, setDate] = useState(new Date(1598051730000));

  const [isChecked, setIsChecked] = useState<boolean>(Boolean(isCheck));

  return (
    <L.Row ph={25} pv={15} items={'center'} justify={'space-between'}>
      <L.Row items={'center'} justify={'space-between'} w={'100%'}>
        <L.Row items={'center'} w={'69%'}>
          <S.description>
            <Font type={'HEADLINE_SEMIBOLD'} color={'WHITE'}>
              {missionDescription}
            </Font>
          </S.description>
          <Font
            type={'FOOTNOTE_REGULAR'}
            color={'GREY1'}
            style={{ marginLeft: 13 }}
          >
            {alertTime}
          </Font>
        </L.Row>
        <TouchableWithoutFeedback onPress={() => setIsChecked(!isChecked)}>
          <View>
            <SvgIcon
              name={isChecked ? 'lucky_check' : 'lucky_uncheck'}
              size={30}
            />
          </View>
        </TouchableWithoutFeedback>
      </L.Row>
    </L.Row>
  );
};
