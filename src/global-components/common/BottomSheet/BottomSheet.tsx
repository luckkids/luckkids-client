import React, { useEffect, useRef } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetModalProvider,
  BottomSheetView,
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

  const bgStyle = useRef({ backgroundColor: theme.BG_SECONDARY }).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      bottomSheetModalRef.current?.present();
    }, 100);

    addHideAnimation(() => {
      return new Promise((resolve) => {
        bottomSheetModalRef.current?.dismiss();
        setTimeout(resolve, 500);
      });
    });

    return () => clearTimeout(timer);
  }, []);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        enableDismissOnClose
        enableDynamicSizing
        onDismiss={hide}
        ref={bottomSheetModalRef}
        index={0}
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
        <BottomSheetView>{component}</BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default createPopup(BottomSheet);
