import { IMissionDataItem } from '@types-common/page.types';

export const getIsMissionFromLuckkids = (
  mission: IMissionDataItem,
): boolean => {
  const { luckkidsMissionId } = mission;
  return !!luckkidsMissionId;
};
