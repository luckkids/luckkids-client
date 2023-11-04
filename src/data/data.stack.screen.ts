import { BottomTabNavigator } from '../route/route.tab.navigator';
import { PageCharacterMake } from '@page/character/page.character.make';
import { PageCharacterName } from '@page/character/page.character.name';
import { PageCharacterSelect } from '@page/character/page.character.select';
import { PageGardenAlbum } from '@page/garden/page.garden.album';
import { PageGardenRank } from '@page/garden/page.garden.rank';
import { PageHomeAlarm } from '@page/home/page.home.alarm';
import { PageHomeCalendar } from '@page/home/page.home.calendar';
import { PageHomeComment } from '@page/home/page.home.comment';
import { PageHomeLevel } from '@page/home/page.home.level';
import { PageLoginJoinId } from '@page/login/join/page.login.join.id';
import { PageLoginJoinPass } from '@page/login/join/page.login.join.pass';
import { PageLogin } from '@page/login/page.login';
import { PageLoginId } from '@page/login/page.login.id';
import { Mission } from '@page/Mission';
import { PageMissionAdd } from '@page/mission/page.mission.add';
import { PageMissionRepair } from '@page/mission/page.mission.repair';
import { PageSetting } from '@page/setting/page.setting';
import { PageSettingAccount } from '@page/setting/page.setting.account';
import { PageSettingAlarm } from '@page/setting/page.setting.alarm';
import { PageSettingInfo } from '@page/setting/page.setting.info';
import { PageSettingNotice } from '@page/setting/page.setting.notice';
import { PageSettingProfile } from '@page/setting/page.setting.profile';
import { PageSettingSecurity } from '@page/setting/page.setting.security';
import { PageSettingSecurityPass } from '@page/setting/security/page.setting.security.pass';
import { PageTutorial } from '@page/tutorial/page.tutorial';
import { AppScreens, IStackScreen } from '@types-common/page.types';
import { PageLoginJoin } from '@page/login/page.login.join';

export const DataStackScreen: Array<IStackScreen> = [
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
    component: PageLoginJoin,
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
    name: AppScreens.Home,
    component: BottomTabNavigator,
  },
  {
    name: AppScreens.HomeAlarm,
    component: PageHomeAlarm,
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
    name: AppScreens.HomeComment,
    component: PageHomeComment,
  },
  {
    name: AppScreens.Mission,
    component: Mission,
  },
  {
    name: AppScreens.MissionRepair,
    component: PageMissionRepair,
  },
  {
    name: AppScreens.MissionAdd,
    component: PageMissionAdd,
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
    name: AppScreens.SettingNotice,
    component: PageSettingNotice,
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
