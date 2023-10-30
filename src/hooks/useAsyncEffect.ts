import React, { DependencyList } from 'react';

const useAsyncEffect = <T extends () => Promise<void>>(
  effect: T,
  deps: DependencyList = [],
) => {
  React.useEffect(() => {
    effect();
  }, deps);
};

export default useAsyncEffect;
