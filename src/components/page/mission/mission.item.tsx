import React, {
  Dispatch,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { Colors, Font, IconNames, L, SvgIcon } from '@design-system';
import { useFetch } from '@hooks/useFetch';
import { IMissionListData } from '@types-common/page.types';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import MissionItemTimePicker from '@components/page/mission/mission.item.time.picker';

const S = {
  item: styled.View({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }),
  Title: styled.View({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }),
  iconRound: styled.View({
    position: 'relative',
    width: '22px',
    height: '22px',
    borderRadius: '22px',
    border: `2px solid ${Colors.GREY1}`,
    marginRight: '16px',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  dot: styled.View({
    position: 'absolute',
    width: '12px',
    height: '12px',
    borderRadius: '12px',
    backgroundColor: Colors.LUCK_GREEN,
  }),
  iconType: styled.View({
    marginRight: '16px',
  }),
};

interface IProps extends IMissionListData {
  prevCount: number;
  setCount: Dispatch<number>;
}

export const MissionItem: React.FC<IProps> = (props) => {
  const [missionState, setMissionState] = useState<string>(props.missionStatus);
  const onMount = useRef(false);
  const [rtnTime, setRtnTime] = useState(props.alertTime);
  const [isChecked, setIsChecked] = useState<boolean>(
    props.alertStatus === 'CHECKED',
  );

  const { onFetch: isSuccessCount } = useFetch({
    method: 'PATCH',
    url: `/missionOutcomes/${props.id}`,
    value: {
      missionStatus: missionState,
    },
    onSuccessCallback: () => {
      if (missionState === 'SUCCEED') {
        props.setCount(props.prevCount + 1);
      } else {
        props.setCount(props.prevCount - 1);
      }
    },
  });

  useEffect(() => {
    if (onMount.current) {
      isSuccessCount();
    } else {
      onMount.current = true;
    }
  }, [missionState]);

  const iconType = useMemo((): IconNames => {
    switch (props.missionType) {
      case 'HOUSEKEEPING':
        return 'iconCategoryHouseKeeping';
      case 'SELF_CARE':
        return 'iconCategorySelfCare';
      case 'HEALTH':
        return 'iconCategoryHealth';
      case 'WORK':
        return 'iconCategoryWork';
      case 'MINDSET':
        return 'iconCategoryMineSet';
      case 'SELF_DEVELOPMENT':
        return 'iconCategorySelfDevelopment';
      default:
        return 'iconCategoryHouseKeeping';
    }
  }, [props]);

  const bullet = useMemo(() => {
    return missionState === 'SUCCEED' ? <S.dot /> : null;
  }, [missionState]);

  const Popup = useCallback(() => {
    BottomSheet.show({
      component: (
        <MissionItemTimePicker
          {...props}
          isCheck={isChecked}
          setIsCheckFn={() => setIsChecked(!isChecked)}
          setRtnTime={setRtnTime}
        />
      ),
    });
  }, [isChecked]);
  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          setMissionState((prev) => {
            return prev === 'SUCCEED' ? 'FAILED' : 'SUCCEED';
          });
        }}
      >
        <L.Row ph={25} pv={20} justify={'space-between'}>
          <S.Title>
            <S.iconRound>{bullet}</S.iconRound>
            <S.iconType>
              <SvgIcon name={iconType} size={24} />
            </S.iconType>
            <Font
              type={'BODY_SEMIBOLD'}
              color={missionState === 'SUCCEED' ? 'GREY1' : 'WHITE'}
            >
              {props.missionDescription}
            </Font>
          </S.Title>
        </L.Row>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => Popup()}>
        <Font type={'SUBHEADLINE_REGULAR'}>
          {isChecked ? rtnTime : '알림 끔'}
        </Font>
      </TouchableWithoutFeedback>
    </>
  );
};
