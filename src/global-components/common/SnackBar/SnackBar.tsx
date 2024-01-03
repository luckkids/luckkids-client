import {
  createPopup,
  SimpleSnackbarProps,
  SimpleSnackbarUI,
} from 'react-native-global-components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Colors, FontSettings } from '@design-system';

interface Props extends SimpleSnackbarProps {
  rounded?: number;
  width?: number;
}

const SnackBar = createPopup(({ rounded = 40, width, ...props }: Props) => {
  const { top } = useSafeAreaInsets();

  return (
    <SimpleSnackbarUI
      offsetY={top || 8}
      styles={{
        title: FontSettings['SUBHEADLINE_REGULAR'],
        container: {
          borderRadius: rounded || 0,
          width,
          backgroundColor: Colors['GREY4'],
          gap: 10,
          display: 'flex',
          flexWrap: 'nowrap',
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 16,
          borderWidth: 1,
        },
      }}
      {...props}
    />
  );
});

export default SnackBar;
