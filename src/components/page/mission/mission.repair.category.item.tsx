import React, { useMemo } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { Colors, Font, IconNames, L, SvgIcon } from '@design-system';
import { IMissionCategoryItem } from '@types-common/page.types';

const S = {
  CategoryButtonWrap: styled.View(
    {
      paddingVertical: 8,
      paddingHorizontal: 14,
      borderRadius: 36,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    (props: { isAddButton?: boolean; isActive?: boolean | null }) => {
      if (props.isAddButton) {
        return {
          backgroundColor: Colors.GREY4,
          border: 'none',
        };
      }
      return {
        backgroundColor: props.isActive
          ? 'rgba(128, 244, 102, 0.2)'
          : 'transparent',
        border: `1px solid ${Colors.GREY4}`,
        borderColor: props.isActive ? Colors.LUCK_GREEN : Colors.GREY4,
      };
    },
  ),
};

type TCategory = {
  label: string;
  icon: IconNames;
};

interface IProps extends IMissionCategoryItem {
  isActive?: boolean | null;
}

export const MissionRepairCategoryItem: React.FC<IProps> = (props) => {
  const categoryButton: TCategory = useMemo(() => {
    switch (props.label) {
      case 'HOUSEKEEPING':
        return {
          label: '집 정돈',
          icon: 'iconCategoryHouseKeeping',
        };
      case 'SELF_CARE':
        return {
          label: '셀프케어',
          icon: 'iconCategorySelfCare',
        };
      case 'HEALTH':
        return {
          label: '건강',
          icon: 'iconCategoryHealth',
        };
      case 'WORK':
        return {
          label: '일',
          icon: 'iconCategoryWork',
        };
      case 'MINDSET':
        return {
          label: '마인드셋',
          icon: 'iconCategoryMineSet',
        };
      case 'SELF_DEVELOPMENT':
        return {
          label: '자기계발',
          icon: 'iconCategorySelfDevelopment',
        };
      default:
        return {
          label: '집 정돈',
          icon: 'iconCategoryHouseKeeping',
        };
    }
  }, []);
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <S.CategoryButtonWrap
        isAddButton={props.isAddButton}
        isActive={props.isActive === null ? null : props.isActive}
      >
        <L.Row pr={7}>
          <SvgIcon
            name={
              props.isAddButton ? 'iconCategoryAddOff' : categoryButton.icon
            }
            size={20}
          />
        </L.Row>
        <Font
          type={'CATEGORY_BUTTON'}
          color={props.isActive ? 'LUCK_GREEN' : 'WHITE'}
        >
          {props.isAddButton ? props.label : categoryButton.label}
        </Font>
      </S.CategoryButtonWrap>
    </TouchableWithoutFeedback>
  );
};
