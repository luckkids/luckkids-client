import React, { createElement } from 'react';
import AlertPopup from '@global-components/common/AlertPopup/AlertPopup';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import LoadingIndicator from '@global-components/common/LoadingIndicator/LoadingIndicator';

/**
 * TODO(Gina)
 * export default withGlobalComponents(RootNavigator);
 */

function withGlobalComponents(Component: () => JSX.Element) {
  return function () {
    return (
      <>
        {createElement(Component)}
        <AlertPopup.Portal />
        <LoadingIndicator.Portal />
        <BottomSheet.Portal />
      </>
    );
  };
}

export default withGlobalComponents;
