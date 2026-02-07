import React, { createElement } from 'react';
import AlertPopup from '@global-components/common/AlertPopup/AlertPopup';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import ContentPopup from '@global-components/common/ContentPopup/ContentPopup';
import LoadingIndicator from '@global-components/common/LoadingIndicator/LoadingIndicator';
import SnackBar from '@global-components/common/SnackBar/SnackBar';
import Tooltip from '@global-components/common/Tooltip/Tooltip';

function withGlobalComponents(Component: React.ComponentType) {
  return function () {
    return (
      <>
        {createElement(Component)}
        <ContentPopup.Portal />
        <AlertPopup.Portal />
        <LoadingIndicator.Portal />
        <BottomSheet.Portal />
        <SnackBar.Portal />
        <Tooltip.Portal />
      </>
    );
  };
}

export default withGlobalComponents;
