import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Colors, Font, IconNames, L, SvgIcon } from '@design-system';

export interface IAddCategory {
  label: string;
  icon: IconNames;
  type: string;
}

interface IProps extends IAddCategory {
  isActive: boolean;
  onPress: () => void;
}

export const MissionAddCategory: React.FC<IProps> = (props) => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <L.Col mt={25}>
        <L.Row
          items="center"
          justify="center"
          style={{
            width: 60,
            height: 60,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: props.isActive ? Colors.LUCK_GREEN : Colors.GREY5,
            backgroundColor: props.isActive
              ? 'rgba(128, 244, 102, 0.2)'
              : Colors.GREY5,
          }}
        >
          <SvgIcon name={props.icon} size={40} />
        </L.Row>
        <Font
          type={'SUBTITLE_LEAGUE'}
          color={props.isActive ? 'LUCK_GREEN' : 'GREY1'}
          textAlign={'center'}
          mt={14}
          style={{ width: '100%' }}
        >
          {props.label}
        </Font>
      </L.Col>
    </TouchableWithoutFeedback>
  );
};
