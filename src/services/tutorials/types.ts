export type Student = {
  studentId: string,
  firstName: string,
}

export type Tutorial = {
  startDatetimeIdentifier: string,
  duration: number,
  attendees: Student[],
  capacity: number,
  course: string,
  host: string,
}
