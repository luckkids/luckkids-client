import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import {
  createPopup,
  SimpleSnackbarProps,
  SimpleSnackbarUI,
} from 'react-native-global-components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSettings } from '@design-system';
import { DEFAULT_MARGIN } from '@constants';

interface Props extends SimpleSnackbarProps {
  rounded?: number;
  width?: number;
  ph?: number;
  pv?: number;
  backgroundColor?: string;
}

const SnackBar = createPopup(
  ({
    rounded = 40,
    width,
    backgroundColor,
    offsetY,
    styles,
    ph,
    pv,
    ...props
  }: Props) => {
    const { top, bottom } = useSafeAreaInsets();

    const getOffsetY = () => {
      const baseOffset = offsetY || 0;
      if (props.position === 'top') return top + baseOffset;
      if (props.position === 'bottom') return bottom + baseOffset;
      return baseOffset;
    };

    return (
      <SimpleSnackbarUI
        offsetY={getOffsetY()}
        styles={{
          title: {
            ...FontSettings['SUBHEADLINE_REGULAR'],
            textAlign: 'left',
          },
          container: {
            borderRadius: rounded,
            width: width || SCREEN_WIDTH - 2 * DEFAULT_MARGIN,
            minWidth: 50,
            maxWidth: SCREEN_WIDTH - 2 * DEFAULT_MARGIN,
            backgroundColor: backgroundColor || Colors['GREY4'],
            display: 'flex',
            flexWrap: 'nowrap',
            flex: 1,
            gap: 10,
            paddingHorizontal: ph || 20,
            paddingVertical: pv || 16,
          },
          ...styles,
        }}
        {...props}
      />
    );
  },
);

export default SnackBar;
