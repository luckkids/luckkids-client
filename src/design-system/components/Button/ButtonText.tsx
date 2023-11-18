import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { ColorKeys, Font, IconNames, L, SvgIcon } from '@design-system';
import { FontType } from '../../foundations/Font/Font';

type ButtonTextProps = {
  text?: string;
  fontType?: FontType;
  textColor?: ColorKeys;
  onPress: () => void;
  iconName?: IconNames;
  iconPosition?: 'leading' | 'trailing';
  iconGap?: number;
  disabled?: boolean;
  children?: React.ReactNode;
};

const ButtonText: React.FC<ButtonTextProps> = ({
  text,
  fontType = 'BODY_REGULAR',
  onPress,
  iconName,
  textColor = 'BLACK',
  iconPosition = 'leading',
  iconGap = 7,
  disabled = false,
  children,
}) => {
  return (
    <TouchableWithoutFeedback disabled={disabled} onPress={onPress}>
      {children ? (
        children
      ) : (
        <View>
          {!!iconName && iconPosition === 'leading' && (
            <L.Row pr={iconGap}>
              <SvgIcon name={iconName} size={22} color={textColor} />
            </L.Row>
          )}
          <Font type={fontType} color={textColor}>
            {text}
          </Font>
          {!!iconName && iconPosition === 'trailing' && (
            <L.Row pl={iconGap}>
              <SvgIcon name={iconName} size={22} color={textColor} />
            </L.Row>
          )}
        </View>
      )}
    </TouchableWithoutFeedback>
  );
};

export default ButtonText;
