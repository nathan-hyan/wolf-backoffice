import { TIME_OPTIONS } from './constants';

export const getTimeStamp = (timestamp: string) => {
  try {
    return new Intl.DateTimeFormat(navigator.language, TIME_OPTIONS).format(new Date(timestamp));
  } catch {
    return '-';
  }
};
