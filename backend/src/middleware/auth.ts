import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import T_JwtPayload from "../types/T_jwt";
export default function auth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authentication;

  if(header && typeof header === "string") {
    const token = header.split(' ')[1];
    try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as T_JwtPayload;
      req.userId = decoded.userId;
      next();
    } catch(e) {
      return res.status(401).json({
        message: "Invalid JWT.",
        error: e
      })
    }
  } else {
    res.status(401).json({
      message: "Invalid auth header."
    })
  }
}