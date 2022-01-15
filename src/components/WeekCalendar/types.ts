export type CalendarEntry = {
  startDatetime: number,
  duration: number,
  title: string,
  subtitle: string,
  color?: 'primary' | 'chemistry' | 'physics',
  action?: 'BOOK' | 'JOIN' | 'CANCEL' | 'FULL',
}

export type CalendarData = {
  [index: number]: CalendarEntry[]
}
