import _ from 'lodash';
import jwt from 'jsonwebtoken';
import { z, ZodError } from 'zod';
import { productSchemaCreate } from '../db/productsSchema';
import { Request, Response, NextFunction } from 'express';
import { JwtAuth } from '../types/global';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');

  if (!token) {
    res.status(400).json({ error: 'Access denied' });
    return;
  }
  try {
    //decode jwt token
    const decoded = jwt.verify(token, 'your-secret') as JwtAuth;

    if (typeof decoded !== 'object' || !decoded?.userId) {
      res.status(400).json({ error: 'Access denied' });
    }

    req.userId = decoded.userId;
    req.role = decoded.role;

    console.log('decoded', decoded);
    next();
  } catch (error) {
    res.status(400).json({ error: 'Access denied' });
  }
}

export function verifySeller(req: Request, res: Response, next: NextFunction) {
  const role = req.role;

  if (role !== 'seller') {
    res.status(401).json({ error: 'Access denied' });
    return;
  }
  next();
}
