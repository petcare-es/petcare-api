import { Request, Response, NextFunction } from "express";
import TokenAuthorizationMissingError from "service/error/TokenAuthorizationMissingError";
import jwt from "jsonwebtoken";
import env from "../env";

interface JwtPayload {
    userId: string;
}

export default function ensureAuthentication(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const authHeader = req.headers.authorization;
  
        if (!authHeader) {
          throw new TokenAuthorizationMissingError();
        }
  
        const [, token] = authHeader.split(' ');
  
        const { userId } = jwt.verify(
            token, 
            env.JWT_SECRET
        ) as JwtPayload;
  
        req.user = { id: userId };

        return next();
      } catch (err) {
        next(err);
      }
}
