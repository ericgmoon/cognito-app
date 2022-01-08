import { CalendarData, CalendarEntry } from './types';

export const isToday = (datetime: number) =>
  (new Date(datetime)).setHours(0, 0, 0, 0) === (new Date()).setHours(0, 0, 0, 0);

export const getArrangedIndex = (array: number[], value: number) => {
  let output = array.length;
  for (let index = 0; index < array.length; index++) {
    if (array[index] > value) {
      output = index;
      break;
    }
  }
  return output;
};

const getDateInMs = (datetime: number) => {
  const date = new Date(datetime);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
};

export const splitEntriesByDay = (entries: CalendarEntry[] | undefined): CalendarData => {
  const output: CalendarData = {};

  if (entries) {
    entries.forEach((entry) => {
      const entryDate = getDateInMs(entry.startDatetime);

      if (!output[entryDate]) output[entryDate] = [entry];
      else {
        // Insert the entry in the correct ascending order
        const datetimes = output[entryDate].map((x) => x.startDatetime);
        const insertionIndex = getArrangedIndex(datetimes, entry.startDatetime);
        output[entryDate].splice(insertionIndex, 0, entry);
      }
    });
  }

  return output;
};
