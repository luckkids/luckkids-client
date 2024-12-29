import { createQueryKeyFactory } from '../queries.utils';

export type GardenQueryList = {
  GARDEN_LIST: {
    size: number;
  };
};

export default createQueryKeyFactory<GardenQueryList>();
