import {
  createPopup,
  SimpleSnackbarProps,
  SimpleSnackbarUI,
} from 'react-native-global-components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSettings } from '@design-system';

const styles: SimpleSnackbarProps['styles'] = {
  title: FontSettings['BODY_REGULAR'],
  container: {
    backgroundColor: Colors['GREY3'],
    paddingHorizontal: 20,
    paddingVertical: 14,
    opacity: 0.5,
  },
};

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
        ...styles,
        container: {
          borderRadius: rounded || 0,
          width,
        },
      }}
      {...props}
    />
  );
});

export default SnackBar;
