interface MockRequest {
  context: {
    userGroups: string[]
  }
}

export const isAdmin = (req: MockRequest) => (req?.context?.userGroups.includes('Admins'));

export const isManager = (req:MockRequest) => (req?.context?.userGroups.includes('Managers'));

export const isOwner = (req:MockRequest) => (req?.context?.userGroups.includes('Owners'));

export const isStudent = (req:MockRequest) => (req?.context?.userGroups.includes('Students'));

export const isTutor = (req:MockRequest) => (req?.context?.userGroups.includes('Tutors'));
