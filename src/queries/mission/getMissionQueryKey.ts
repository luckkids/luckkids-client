import { createQueryKeyFactory } from '../queries.utils';

export type MissionQueryList = {
  MISSION_LIST: undefined;
  MISSION_OUTCOME_LIST: undefined;
  MISSION_OUTCOME_COUNT: undefined;
  INITIAL_LUCKKIDS_MISSION_LIST: undefined;
  LUCK_MESSAGE_HISTORY: undefined;
};

export default createQueryKeyFactory<MissionQueryList>();
