import { IconNames } from '@design-system';
import { MissionType } from '@types-index';

export const mission_categories: Array<{
  label: string;
  icon: IconNames;
  type: MissionType;
}> = [
  {
    label: '집 정돈',
    icon: 'iconCategoryHouseKeeping',
    type: 'HOUSEKEEPING',
  },
  {
    label: '셀프케어',
    icon: 'iconCategorySelfCare',
    type: 'SELF_CARE',
  },
  {
    label: '건강',
    icon: 'iconCategoryHealth',
    type: 'HEALTH',
  },
  {
    label: '일',
    icon: 'iconCategoryWork',
    type: 'WORK',
  },
  {
    label: '마인드셋',
    icon: 'iconCategoryMineSet',
    type: 'MINDSET',
  },
  {
    label: '자기계발',
    icon: 'iconCategorySelfDevelopment',
    type: 'SELF_DEVELOPMENT',
  },
];

export const levelup_contents: Array<{
  level: number;
  title: string;
  description: string;
}> = [
  {
    level: 1,
    title: '럭키즈 탄생을 축하해요!',
    description:
      '과연 어떤 럭키즈로 커갈까요?\n꾸준히 습관을 수행하며 럭키즈를 키워보세요.',
  },
  {
    level: 2,
    title: '발이 자랐어요!',
    description:
      '럭키즈에게 귀여운 발이 자라났어요.\n다음 단계에는 또 어떻게 성장할까요?',
  },
  {
    level: 3,
    title: '럭키즈 키가 쑥!',
    description:
      '어느새 키가 쑥 커진 럭키즈. 습관을 조금만\n더 수행하면 완전한 럭키즈를 만날 수 있어요!',
  },
  {
    level: 4,
    title: '두근두근!\n더 자라난 럭키즈',
    description:
      '기다리고 기다리던 럭키즈 캐릭터의 등장.\n100% 성장까지 함께 힘을 내보아요!',
  },
  {
    level: 5,
    title: '짠, 럭키즈 성장 완료!',
    description:
      '우리는 행운아! 또 하나의 행운을 키웠어요.\n다음엔 어떤 럭키즈를 키우게 될까요?',
  },
];
