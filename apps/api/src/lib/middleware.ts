import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';


export function protect(req: Request, res: Response, next: NextFunction) {
  const  secretKey = process.env.SECRET;
  const token = req.headers.authorization;

  if (!secretKey){
    console.log("Secret Key Not found");
    return
  }

  if (!token) 
  return res.status(401).json({status: false, msg : "NO Token Provied"});

  // verify the token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(403).json({status : false, msg: 'Failed To authorize'});

    if (!decoded) return res.status(403);
    if (typeof decoded == 'string') return res.status(403);

    req.headers.user = decoded.username;
    next();
  })
}