import {
  isAdmin, isManager, isOwner, isStudent, isTutor,
} from './utils';

describe('isAdmin', () => {
  test('should return true for admins', () => {
    expect(isAdmin({ context: { userGroups: ['Admins'] } })).toBe(true);
    expect(isAdmin({ context: { userGroups: ['Students', 'Admins'] } })).toBe(true);
    expect(isAdmin({ context: { userGroups: ['Admins', 'Students'] } })).toBe(true);
    expect(isAdmin({ context: { userGroups: ['Students', 'Owners', 'Admins', 'Tutors'] } })).toBe(true);
  });

  test('should return false for non-admins', () => {
    expect(isAdmin({ context: { userGroups: ['Tutors'] } })).toBe(false);
    expect(isAdmin({ context: { userGroups: ['Admin'] } })).toBe(false);
    expect(isAdmin({ context: { userGroups: [] } })).toBe(false);
    expect(isAdmin({ context: { userGroups: ['Tutors', 'Owners'] } })).toBe(false);
  });
});

describe('isManager', () => {
  test('should return true for admins', () => {
    expect(isManager({ context: { userGroups: ['Managers'] } })).toBe(true);
    expect(isManager({ context: { userGroups: ['Students', 'Managers'] } })).toBe(true);
    expect(isManager({ context: { userGroups: ['Managers', 'Students'] } })).toBe(true);
    expect(isManager({ context: { userGroups: ['Students', 'Owners', 'Managers', 'Tutors'] } })).toBe(true);
  });

  test('should return false for non-admins', () => {
    expect(isManager({ context: { userGroups: ['Admins'] } })).toBe(false);
    expect(isManager({ context: { userGroups: ['Manager'] } })).toBe(false);
    expect(isManager({ context: { userGroups: [] } })).toBe(false);
    expect(isManager({ context: { userGroups: ['Tutors', 'Owners'] } })).toBe(false);
  });
});

describe('isOwner', () => {
  test('should return true for admins', () => {
    expect(isOwner({ context: { userGroups: ['Owners'] } })).toBe(true);
    expect(isOwner({ context: { userGroups: ['Students', 'Owners'] } })).toBe(true);
    expect(isOwner({ context: { userGroups: ['Owners', 'Students'] } })).toBe(true);
    expect(isOwner({ context: { userGroups: ['Students', 'Owners', 'Admins', 'Tutors'] } })).toBe(true);
  });

  test('should return false for non-admins', () => {
    expect(isOwner({ context: { userGroups: ['Tutors'] } })).toBe(false);
    expect(isOwner({ context: { userGroups: ['Owner'] } })).toBe(false);
    expect(isOwner({ context: { userGroups: [] } })).toBe(false);
    expect(isOwner({ context: { userGroups: ['Admins', 'Managers'] } })).toBe(false);
  });
});

describe('isStudent', () => {
  test('should return true for admins', () => {
    expect(isStudent({ context: { userGroups: ['Students'] } })).toBe(true);
    expect(isStudent({ context: { userGroups: ['Students', 'Admins'] } })).toBe(true);
    expect(isStudent({ context: { userGroups: ['Admins', 'Students'] } })).toBe(true);
    expect(isStudent({ context: { userGroups: ['Students', 'Owners', 'Admins', 'Tutors'] } })).toBe(true);
  });

  test('should return false for non-admins', () => {
    expect(isStudent({ context: { userGroups: ['Tutors'] } })).toBe(false);
    expect(isStudent({ context: { userGroups: ['Student'] } })).toBe(false);
    expect(isStudent({ context: { userGroups: [] } })).toBe(false);
    expect(isStudent({ context: { userGroups: ['Admins', 'Owners'] } })).toBe(false);
  });
});

describe('isTutor', () => {
  test('should return true for admins', () => {
    expect(isTutor({ context: { userGroups: ['Tutors'] } })).toBe(true);
    expect(isTutor({ context: { userGroups: ['Students', 'Tutors'] } })).toBe(true);
    expect(isTutor({ context: { userGroups: ['Tutors', 'Students'] } })).toBe(true);
    expect(isTutor({ context: { userGroups: ['Students', 'Owners', 'Admins', 'Tutors'] } })).toBe(true);
  });

  test('should return false for non-admins', () => {
    expect(isTutor({ context: { userGroups: ['Owners'] } })).toBe(false);
    expect(isTutor({ context: { userGroups: ['Tutor'] } })).toBe(false);
    expect(isTutor({ context: { userGroups: [] } })).toBe(false);
    expect(isTutor({ context: { userGroups: ['Admins', 'Owners'] } })).toBe(false);
  });
});
