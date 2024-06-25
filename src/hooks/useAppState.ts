import { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export function useAppState(onFocus?: () => void, onBlur?: () => void) {
  useEffect(() => {
    let lastAppState = AppState.currentState as AppStateStatus;

    function onChange(newState: AppStateStatus) {
      if (lastAppState.match(/inactive|background/) && newState === 'active') {
        onFocus?.();
      }
      if (lastAppState === 'active' && newState.match(/inactive|background/)) {
        onBlur?.();
      }
      lastAppState = newState;
    }

    const subscription = AppState.addEventListener('change', onChange);

    return () => {
      subscription.remove();
    };
  }, [onFocus, onBlur]);
}
