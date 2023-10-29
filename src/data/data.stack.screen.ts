import { PageTutorial } from '../page/tutorial/page.tutorial';
import { RouteTabNavigator } from '../route/route.tab.navigator';
import { AppScreens, IStackScreen } from '../types/common/page.types';
import { PageLogin } from '@page/login/page.login';
import { PageLoginId } from '@page/login/page.login.id';
import { PageLoginJoinPass } from '@page/login/join/page.login.join.pass';
import { PageLoginJoinId } from '@page/login/join/page.login.join.id';
import { PageCharacterMake } from '@page/character/page.character.make';
import { PageCharacterSelect } from '@page/character/page.character.select';
import { PageCharacterName } from '@page/character/page.character.name';
import { PageHomeCalendar } from '@page/home/page.home.calendar';
import { PageHomeLevel } from '@page/home/page.home.level';
import { PageMissionRepair } from '@page/mission/page.mission.repair';
import { PageGardenAlbum } from '@page/garden/page.garden.album';
import { PageGardenRank } from '@page/garden/page.garden.rank';
import { PageSetting } from '@page/setting/page.setting';
import { PageSettingProfile } from '@page/setting/page.setting.profile';
import { PageSettingAlarm } from '@page/setting/page.setting.alarm';
import { PageSettingInfo } from '@page/setting/page.setting.info';
import { PageSettingSecurity } from '@page/setting/page.setting.security';
import { PageSettingSecurityPass } from '@page/setting/security/page.setting.security.pass';
import { PageSettingAccount } from '@page/setting/page.setting.account';

export const DataStackScreen: Array<IStackScreen> = [
  {
    name: AppScreens.Home,
    component: RouteTabNavigator,
  },
  {
    name: AppScreens.Tutorial,
    component: PageTutorial,
  },
  {
    name: AppScreens.Login,
    component: PageLogin,
  },
  {
    name: AppScreens.LoginJoinId,
    component: PageLoginJoinId,
  },
  {
    name: AppScreens.LoginJoinPass,
    component: PageLoginJoinPass,
  },
  {
    name: AppScreens.LoginId,
    component: PageLoginId,
  },
  {
    name: AppScreens.CharacterMake,
    component: PageCharacterMake,
  },
  {
    name: AppScreens.CharacterSelect,
    component: PageCharacterSelect,
  },
  {
    name: AppScreens.CharacterName,
    component: PageCharacterName,
  },
  {
    name: AppScreens.HomeCalendar,
    component: PageHomeCalendar,
  },
  {
    name: AppScreens.HomeLevel,
    component: PageHomeLevel,
  },
  {
    name: AppScreens.MissionRepair,
    component: PageMissionRepair,
  },
  {
    name: AppScreens.GardenAlbum,
    component: PageGardenAlbum,
  },
  {
    name: AppScreens.GardenRank,
    component: PageGardenRank,
  },
  {
    name: AppScreens.Setting,
    component: PageSetting,
  },
  {
    name: AppScreens.SettingProfile,
    component: PageSettingProfile,
  },
  {
    name: AppScreens.SettingAlarm,
    component: PageSettingAlarm,
  },
  {
    name: AppScreens.SettingInfo,
    component: PageSettingInfo,
  },
  {
    name: AppScreens.SettingSecurity,
    component: PageSettingSecurity,
  },
  {
    name: AppScreens.SettingSecurityPass,
    component: PageSettingSecurityPass,
  },
  {
    name: AppScreens.SettingAccount,
    component: PageSettingAccount,
  },
];
