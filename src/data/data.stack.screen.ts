import { BottomTabNavigator } from '../route/route.tab.navigator';
import { PageCharacterMake } from '@page/character/page.character.make';
import { PageCharacterName } from '@page/character/page.character.name';
import { PageCharacterSelect } from '@page/character/page.character.select';
import PageUpdateScreen from '@page/common/page.common.update';
import { PageWebView } from '@page/common/page.common.webview';
import { Garden } from '@page/Garden';
import { PageGardenAlbum } from '@page/garden/page.garden.album';
import { PageGardenRank } from '@page/garden/page.garden.rank';
import { PageHomeAlarm } from '@page/home/page.home.alarm';
import { PageHomeCalendar } from '@page/home/page.home.calendar';
import { PageHomeLevel } from '@page/home/page.home.level';
import { PageHomeProfile } from '@page/home/page.home.profile';
import { PageHomeProfileShare } from '@page/home/page.home.profile.share';
import { PageLogin } from '@page/login/page.login';
import { PageLoginAlready } from '@page/login/page.login.already';
import { PageLoginId } from '@page/login/page.login.id';
import { PageLoginJoin } from '@page/login/page.login.join';
import { PageLoginJoinAgreement } from '@page/login/page.login.join.agreement';
import { PageLoginJoinEmailConfirm } from '@page/login/page.login.join.email.confirm';
import { Mission } from '@page/Mission';
import { PageMissionAdd } from '@page/mission/page.mission.add';
import { PageMissionRepair } from '@page/mission/page.mission.repair';
import { PageMissionRepairPublic } from '@page/mission/page.mission.repair.public';
import { My } from '@page/My';
import { PageSetting } from '@page/setting/page.setting';
import { PageSettingAccount } from '@page/setting/page.setting.account';
import { PageSettingAlarm } from '@page/setting/page.setting.alarm';
import { PageSettingComment } from '@page/setting/page.setting.comment';
import { PageSettingInfo } from '@page/setting/page.setting.info';
import { PageSettingInfoPassword } from '@page/setting/page.setting.info.password';
import { PageSettingNotice } from '@page/setting/page.setting.notice';
import { PageSettingProfile } from '@page/setting/page.setting.profile';
import { PageStoryTelling } from '@page/story-telling/page.story-telling';
import { PageTutorialGuide } from '@page/tutorial/page.tutorial.guide';
import { PageTutorialSettingCharacter } from '@page/tutorial/page.tutorial.setting.character';
import { PageTutorialSettingMission } from '@page/tutorial/page.tutorial.setting.mission';
import { PageTutorialSettingNoti } from '@page/tutorial/page.tutorial.setting.noti';
import { PageTutorialStart } from '@page/tutorial/page.tutorial.start';
import { IStackScreen } from '@types-common/page.types';

export const DataStackScreen: Array<IStackScreen> = [
  {
    name: 'Home',
    component: BottomTabNavigator,
    options: {
      gestureEnabled: false,
    },
  },
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
    name: 'LoginJoinAgreement',
    component: PageLoginJoinAgreement,
  },
  {
    name: 'TutorialStart',
    component: PageTutorialStart,
  },
  {
    name: 'TutorialGuide',
    component: PageTutorialGuide,
  },
  {
    name: 'TutorialSettingCharacter',
    component: PageTutorialSettingCharacter,
  },
  {
    name: 'TutorialSettingMission',
    component: PageTutorialSettingMission,
  },
  {
    name: 'TutorialSettingNoti',
    component: PageTutorialSettingNoti,
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
    name: 'HomeProfile',
    component: PageHomeProfile,
  },
  {
    name: 'HomeProfileShare',
    component: PageHomeProfileShare,
  },
  {
    name: 'My',
    component: My,
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
    name: 'MissionRepairPublic',
    component: PageMissionRepairPublic,
  },
  {
    name: 'MissionAdd',
    component: PageMissionAdd,
  },
  {
    name: 'Garden',
    component: Garden,
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
    name: 'SettingComment',
    component: PageSettingComment,
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
    name: 'SettingNotice',
    component: PageSettingNotice,
  },
  {
    name: 'SettingInfoPassword',
    component: PageSettingInfoPassword,
  },
  {
    name: 'SettingAccount',
    component: PageSettingAccount,
  },
  {
    name: 'WebView',
    component: PageWebView,
  },
  {
    name: 'UpdateScreen',
    component: PageUpdateScreen,
  },
];
