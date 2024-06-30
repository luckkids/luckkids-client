import { format } from 'date-fns';

const MILLISECOND = 1000;
const SECOND = 60;
const MINUTE = 60;
const HOUR = 24;
const YEAR = 365;

export const YEAR_AS_MILLISECOND = MILLISECOND * SECOND * MINUTE * HOUR * YEAR;
export const DAY_AS_MILLISECOND = MILLISECOND * SECOND * MINUTE * HOUR;
export const HOUR_AS_MILLISECOND = MILLISECOND * SECOND * MINUTE;
export const MINUTE_AS_MILLISECOND = MILLISECOND * SECOND;
export const SECOND_AS_MILLISECOND = MILLISECOND;

// export const APP_LAUNCH_DATE = format(new Date(), 'yyyy-MM-dd');
export const APP_LAUNCH_DATE = '2024-05-01';
