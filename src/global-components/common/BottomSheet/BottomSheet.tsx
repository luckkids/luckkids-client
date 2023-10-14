import React, { useEffect, useRef } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { createPopup, usePopupContext } from 'react-native-global-components';
import { useTheme } from 'styled-components/native';

interface BottomSheetProps {
  component: React.ReactElement;
  bottomSheetModalProps?: Partial<BottomSheetModalProps>;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  component,
  bottomSheetModalProps,
}) => {
  const { addHideAnimation, hide } = usePopupContext();

  const theme = useTheme();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const bgStyle = useRef({ backgroundColor: theme.BASIC_WHITE }).current;

  const snapPoints = useRef([400]).current;

  useEffect(() => {
    bottomSheetModalRef.current?.present();

    addHideAnimation(() => {
      return new Promise((resolve) => {
        bottomSheetModalRef.current?.dismiss();
        setTimeout(resolve, 500);
      });
    });
  }, []);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        enableDismissOnClose
        onDismiss={hide}
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={bgStyle}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
        {...bottomSheetModalProps}
      >
        {component}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default createPopup(BottomSheet);
