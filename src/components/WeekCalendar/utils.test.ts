import {
  getArrangedIndex, isToday, splitEntriesByDay,
} from './utils';

describe('isToday', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
    // Mock system time as 3pm on the 25th of Decemeber 2021
    jest.setSystemTime(new Date(2021, 12, 25, 15, 0, 0, 0));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should return true for todays', () => {
    expect(isToday(new Date().getTime())).toBe(true);
    expect(isToday(new Date(2021, 12, 25).getTime())).toBe(true);
    expect(isToday(new Date(2021, 12, 25, 23, 59, 59, 0).getTime())).toBe(true);
    expect(isToday(new Date(2021, 12, 25, 11, 30, 30, 0).getTime())).toBe(true);
  });

  test('should return false for other days', () => {
    expect(isToday(new Date(2021, 12, 24).getTime())).toBe(false);
    expect(isToday(new Date(2021, 12, 26).getTime())).toBe(false);
    expect(isToday(new Date(2022, 12, 25).getTime())).toBe(false);
  });
});

describe('getArrangedIndex', () => {
  test('should return for empty arrays', () => {
    expect(getArrangedIndex([], 0)).toBe(0);
    expect(getArrangedIndex([], -1)).toBe(0);
    expect(getArrangedIndex([], 1)).toBe(0);
  });

  test('should return for ascending arrays', () => {
    expect(getArrangedIndex([1, 2, 4], 3)).toBe(2);
    expect(getArrangedIndex([1, 3], 2)).toBe(1);
    expect(getArrangedIndex([1, 10, 100], 50)).toBe(2);
  });

  test('should return for constant arrays', () => {
    expect(getArrangedIndex([1, 1, 1], 0)).toBe(0);
    expect(getArrangedIndex([1, 1, 1], 1)).toBe(3);
    expect(getArrangedIndex([1, 1, 1], 2)).toBe(3);
  });

  test('should return for other arrays', () => {
    expect(getArrangedIndex([0, 1, 1, 1, 2, 6, 6, 8], 0)).toBe(1);
    expect(getArrangedIndex([0, 1, 1, 1, 2, 6, 6, 8], 1)).toBe(4);
    expect(getArrangedIndex([0, 1, 1, 1, 2, 6, 6, 8], 3)).toBe(5);
    expect(getArrangedIndex([0, 1, 1, 1, 2, 6, 6, 8], 4)).toBe(5);
    expect(getArrangedIndex([0, 1, 1, 1, 2, 6, 6, 8], 7)).toBe(7);
    expect(getArrangedIndex([0, 1, 1, 1, 2, 6, 6, 8], 100)).toBe(8);
  });
});

describe('splitEntriesByDay', () => {
  test('should split entries by day', () => {
    expect(splitEntriesByDay([
      {
        // 25th of December 11.30 AM
        startDatetime: 1640392200000,
        duration: 30,
        title: 'Chemistry Tutorial',
      },
      {
        // 25th of December 10.30 AM
        startDatetime: 1640388600000,
        duration: 30,
        title: 'Chemistry Tutorial',
      },
      {
        // 25th of December 11.59 PM
        startDatetime: 1640437140000,
        duration: 30,
        title: 'Chemistry Tutorial',
      },
      {
        // 26th of December 12.01 AM
        startDatetime: 1640437260000,
        duration: 30,
        title: 'Biology Tutorial',
      },
      {
        // 26th of December 11.59 PM
        startDatetime: 1640523540000,
        duration: 30,
        title: 'Physics Tutorial',
      },
      {
        // 27th of December 12.01 AM
        startDatetime: 1640523660000,
        duration: 30,
        title: 'Chemistry Tutorial',
      },
      {
        // 30th of December 12.01 AM
        startDatetime: 1640782860000,
        duration: 30,
        title: 'Chemistry Tutorial',
      },
    ])).toStrictEqual({
      1640350800000: [
        {
          startDatetime: 1640388600000,
          duration: 30,
          title: 'Chemistry Tutorial',
        },
        {
          startDatetime: 1640392200000,
          duration: 30,
          title: 'Chemistry Tutorial',
        },
        {
          startDatetime: 1640437140000,
          duration: 30,
          title: 'Chemistry Tutorial',
        },
      ],
      1640437200000: [
        {
          startDatetime: 1640437260000,
          duration: 30,
          title: 'Biology Tutorial',
        },
        {
          startDatetime: 1640523540000,
          duration: 30,
          title: 'Physics Tutorial',
        },
      ],
      1640523600000: [
        {
          startDatetime: 1640523660000,
          duration: 30,
          title: 'Chemistry Tutorial',
        },
      ],
      1640782800000: [
        {
          startDatetime: 1640782860000,
          duration: 30,
          title: 'Chemistry Tutorial',
        },
      ],
    });
  });
});
