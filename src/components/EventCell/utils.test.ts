import { stringifyTime } from './utils';

describe('stringifyDatetime', () => {
  test('should return correct strings', () => {
    expect(stringifyTime(new Date(2021, 12, 25, 23, 59, 59, 0).getTime())).toBe('11:59 PM');
    expect(stringifyTime(new Date(2021, 12, 25, 11, 30, 30, 0).getTime())).toBe('11:30 AM');
  });

  test('should return 12:00 am if dateless', () => {
    expect(stringifyTime(new Date(2021, 12, 25).getTime())).toBe('12:00 AM');
  });
});
