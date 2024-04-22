import { NavigationContainerRef } from '@react-navigation/native';
import RouterService from './RouterService';
import { AppScreensParamList } from '@types-common/page.types';

interface ScreenContext {
  prevScreenName: string;
  currentScreenName: string;
}

class NavigationService extends RouterService {
  private navigation: NavigationContainerRef<AppScreensParamList> | null = null;

  private screenContext: ScreenContext = {
    prevScreenName: 'initial',
    currentScreenName: 'initial',
  };

  public setNavigation(
    _navigation: NavigationContainerRef<AppScreensParamList>,
  ): void {
    this.navigation = _navigation;
  }

  public setScreenContext(ctx: ScreenContext): void {
    this.screenContext = { ...ctx };
  }

  public getScreenContext(): ScreenContext {
    return { ...this.screenContext };
  }

  public navigate(url: string): void {
    console.log(33, url);
    if (typeof url !== 'string' || !url) {
      return console.log('[Router] invalid type url', url);
    }

    if (!this.navigation) {
      return console.log('[Router] setNavigation before request navigate');
    }

    const args = NavigationService.parseUrl(url);

    // invalid url
    if (args.length === 0) return;

    // if app routing
    const state = this.navigation.getState();
    if (!state) {
      return;
    }

    if (state.routeNames.find((v) => v === args[0])) {
      this.navigation.navigate(...args);
    }
  }
}

export default new NavigationService();
