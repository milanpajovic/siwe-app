
import { Request, Response, NextFunction } from 'express';
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session.siwe) {
    // Session is valid, user is authenticated
    next();
  } else {
    // No valid session, user not authenticated
    res.status(401).json({ message: "Unauthorized" });
  }
}
