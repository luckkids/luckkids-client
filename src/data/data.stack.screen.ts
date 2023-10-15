import { PageTutorialStart } from '../page/tutorial/page.tutorial.start';
import { PageTutorialSurvey } from '../page/tutorial/page.tutorial.survey';
import { RouteTabNavigator } from '../route/route.tab.navigator';
import { AppScreens, IStackScreen } from '../types/common/page.types';

export const DataStackScreen: Array<IStackScreen> = [
  {
    name: AppScreens.TutorialStart,
    options: { headerShown: true, headerTitle: '튜토리얼' },
    component: PageTutorialStart,
  },
  {
    name: AppScreens.TutorialSurvey,
    options: { headerShown: true, headerTitle: '시작하기' },
    component: PageTutorialSurvey,
  },
  {
    name: AppScreens.Home,
    options: { headerShown: false },
    component: RouteTabNavigator,
  },
];
