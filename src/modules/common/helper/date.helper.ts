import * as dayjs from 'dayjs';

export function convertToDate(date: string) {
  return dayjs(date).format();
}

export function monthDifference(date: string) {
  const newDate = dayjs();
  return newDate.diff(date, 'month', true);
}
