import 'express';

declare global {
  namespace Express {
    interface Request {
      context: {
        userId: string | undefined,
        userGroups: string[] | []
      }
    }
  }
}
