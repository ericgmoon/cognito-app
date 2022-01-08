export type CalendarEntry = {
  startDatetime: number,
  duration: number,
  title: string,
  subtitle: string,
  color?: 'primary' | 'chemistry' | 'physics',
}

export type CalendarData = {
  [index: number]: CalendarEntry[]
}
