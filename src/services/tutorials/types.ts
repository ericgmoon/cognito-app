export type Student = {
  studentId: string,
  firstName: string,
  gradYear: number
}

export type Tutorial = {
  startDatetimeIdentifier: string,
  duration: number,
  attendees: Student[],
  capacity: number,
  course: string,
  host: string,
}
