import {
  createPopup,
  SimpleSnackbarProps,
  SimpleSnackbarUI,
} from 'react-native-global-components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSettings } from '@design-system';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { DEFAULT_MARGIN } from '@constants';

interface Props extends SimpleSnackbarProps {
  rounded?: number;
  width?: number;
}

const SnackBar = createPopup(
  ({ rounded = 40, width, styles, ...props }: Props) => {
    const { top } = useSafeAreaInsets();

    return (
      <SimpleSnackbarUI
        offsetY={top || 8}
        styles={{
          title: FontSettings['SUBHEADLINE_REGULAR'],
          container: {
            borderRadius: rounded,
            width,
            maxWidth: SCREEN_WIDTH - 2 * DEFAULT_MARGIN,
            backgroundColor: Colors['GREY4'],
            gap: 10,
            display: 'flex',
            flexWrap: 'nowrap',
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 16,
            height: 52,
          },

          ...styles,
        }}
        {...props}
      />
    );
  },
);

export default SnackBar;
