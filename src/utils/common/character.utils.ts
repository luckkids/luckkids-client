import { CLOUD_FRONT_PREFIX } from './image.utils';
import { CompletedCharacterCount } from '@apis/home';
import { CharacterType } from '@types-common/character.types';

export const getCharacterImage = (
  characterType: CharacterType | null,
  level: number | null,
  type?: 'normal' | 'back' | 'wood',
) => {
  let folderPath = 'characters';
  if (type === 'back') {
    folderPath = 'characters-with-back';
  } else if (type === 'wood') {
    folderPath = 'characters-with-wood';
  }

  if (!characterType || !level) {
    return `${CLOUD_FRONT_PREFIX}/${folderPath}/01_first.png`;
  }

  const paddedLevel = level.toString().padStart(2, '0');

  return level === 1
    ? `${CLOUD_FRONT_PREFIX}/${folderPath}/01_first.png`
    : `${CLOUD_FRONT_PREFIX}/${folderPath}/${paddedLevel}_${characterType.toLowerCase()}.png`;
};

export const getLevelToolTipText = (currentLevel: number) => {
  switch (currentLevel) {
    case 1:
      return '네 단계 남았어요';
    case 2:
      return '세 단계 남았어요';
    case 3:
      return '두 단계 남았어요';
    case 4:
      return '한 단계 남았어요';
    default:
      return '';
  }
};

export const getCompletedCharacterCount = (
  completedCharacterCount: CompletedCharacterCount,
) => {
  const { RABBIT, SUN, STONE, CLOVER, CLOUD } = completedCharacterCount;
  return RABBIT + SUN + STONE + CLOVER + CLOUD;
};

export const getLuckCardImage = (
  characterType: CharacterType,
  level: number,
) => {
  const paddedLevel = level.toString().padStart(2, '0');

  return level === 1
    ? `${CLOUD_FRONT_PREFIX}/luck-card/01_first.png`
    : `${CLOUD_FRONT_PREFIX}/luck-card/${paddedLevel}_${characterType.toLowerCase()}.png`;
};
