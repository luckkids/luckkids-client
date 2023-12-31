import { BottomTabNavigator } from '../route/route.tab.navigator';
import { PageCharacterMake } from '@page/character/page.character.make';
import { PageCharacterName } from '@page/character/page.character.name';
import { PageCharacterSelect } from '@page/character/page.character.select';
import { PageWebView } from '@page/common/page.common.webview';
import { PageGardenAlbum } from '@page/garden/page.garden.album';
import { PageGardenRank } from '@page/garden/page.garden.rank';
import { PageHomeAlarm } from '@page/home/page.home.alarm';
import { PageHomeCalendar } from '@page/home/page.home.calendar';
import { PageHomeComment } from '@page/home/page.home.comment';
import { PageHomeLevel } from '@page/home/page.home.level';
import { PageLogin } from '@page/login/page.login';
import { PageLoginAgreement } from '@page/login/page.login.agreement';
import { PageLoginAlready } from '@page/login/page.login.already';
import { PageLoginId } from '@page/login/page.login.id';
import { PageLoginJoin } from '@page/login/page.login.join';
import { PageLoginJoinEmailConfirm } from '@page/login/page.login.join.email.confirm';
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
import { PageStoryTelling } from '@page/story-telling/page.story-telling';
import { IStackScreen } from '@types-common/page.types';

export const DataStackScreen: Array<IStackScreen> = [
  {
    name: 'StoryTelling',
    component: PageStoryTelling,
  },
  {
    name: 'Login',
    component: PageLogin,
  },
  {
    name: 'LoginAlready',
    component: PageLoginAlready,
  },
  {
    name: 'LoginJoin',
    component: PageLoginJoin,
  },
  {
    name: 'LoginJoinEmailConfirm',
    component: PageLoginJoinEmailConfirm,
  },
  {
    name: 'LoginId',
    component: PageLoginId,
  },
  {
    name: 'LoginAgreement',
    component: PageLoginAgreement,
  },
  {
    name: 'CharacterMake',
    component: PageCharacterMake,
  },
  {
    name: 'CharacterSelect',
    component: PageCharacterSelect,
  },
  {
    name: 'CharacterName',
    component: PageCharacterName,
  },
  {
    name: 'Home',
    component: BottomTabNavigator,
  },
  {
    name: 'HomeAlarm',
    component: PageHomeAlarm,
  },
  {
    name: 'HomeCalendar',
    component: PageHomeCalendar,
  },
  {
    name: 'HomeLevel',
    component: PageHomeLevel,
  },
  {
    name: 'HomeComment',
    component: PageHomeComment,
  },
  {
    name: 'Mission',
    component: Mission,
  },
  {
    name: 'MissionRepair',
    component: PageMissionRepair,
  },
  {
    name: 'MissionAdd',
    component: PageMissionAdd,
  },
  {
    name: 'GardenAlbum',
    component: PageGardenAlbum,
  },
  {
    name: 'GardenRank',
    component: PageGardenRank,
  },
  {
    name: 'Setting',
    component: PageSetting,
  },
  {
    name: 'SettingProfile',
    component: PageSettingProfile,
  },
  {
    name: 'SettingAlarm',
    component: PageSettingAlarm,
  },
  {
    name: 'SettingInfo',
    component: PageSettingInfo,
  },
  {
    name: 'SettingSecurity',
    component: PageSettingSecurity,
  },
  {
    name: 'SettingNotice',
    component: PageSettingNotice,
  },
  {
    name: 'SettingSecurityPass',
    component: PageSettingSecurityPass,
  },
  {
    name: 'SettingAccount',
    component: PageSettingAccount,
  },
  {
    name: 'WebView',
    component: PageWebView,
  },
];
