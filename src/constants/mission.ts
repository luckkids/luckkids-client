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
