import { Request, Response } from 'express';

export default (endpointFunc: (reqParam: Request, resParam: Response) => any) =>
  (req: Request, res: Response) => {
    if (req?.context?.userId) endpointFunc(req, res);
    else res.status(401).json({ message: 'Unauthorised action' });
  };
