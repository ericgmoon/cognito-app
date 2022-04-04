export type CalendarEntry = {
  startDatetime: number,
  duration: number,
  title: string,
  color?: 'primary' | 'chemistry' | 'physics',
  properties?: {[key: string]: string},
  state?: 'imminent' | 'open' | 'full' | 'booked' | 'readOnly',
}

export type CalendarData = {
  [index: number]: CalendarEntry[]
}
