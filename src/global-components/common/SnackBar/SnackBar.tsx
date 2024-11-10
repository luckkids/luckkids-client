import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import {
  createPopup,
  SimpleSnackbarProps,
  SimpleSnackbarUI,
} from 'react-native-global-components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSettings } from '@design-system';

interface Props extends SimpleSnackbarProps {
  rounded?: number;
  width?: number;
}

const SnackBar = createPopup(
  ({ rounded = 40, width, offsetY, styles, ...props }: Props) => {
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
            width: width || 340,
            minWidth: 50,
            maxWidth: 340,
            backgroundColor: Colors['GREY4'],
            display: 'flex',
            flexWrap: 'nowrap',
            flex: 1,
            gap: 10,
            paddingHorizontal: 20,
            paddingVertical: 16,
          },
          ...styles,
        }}
        {...props}
      />
    );
  },
);

export default SnackBar;
