import React, { createElement } from 'react';
import AlertPopup from '@global-components/common/AlertPopup/AlertPopup';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import LoadingIndicator from '@global-components/common/LoadingIndicator/LoadingIndicator';
import SnackBar from '@global-components/common/SnackBar/SnackBar';
import Tooltip from '@global-components/common/Tooltip/Tooltip';

function withGlobalComponents(Component: React.ComponentType) {
  return function () {
    return (
      <>
        {createElement(Component)}
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
