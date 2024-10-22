import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../../db';
import { usersTable } from '../../db/usersSchema';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.cleanBody;

    //check if user exist
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user) {
      res.status(401).send({ message: ' user Authentication failed' });
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(401).send({ message: 'Authentication failed' });
      return;
    }

    //@ts-ignore
    delete user.password;

    //create a jwt
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      'your-secret',
      { expiresIn: '30d' }
    );

    res.status(200).json({ token, user });
  } catch (err) {
    next(err);
  }
}

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const data = req.cleanBody;
  data.password = await bcrypt.hash(data.password, 10);

  try {
    const [user] = await db.insert(usersTable).values(data).returning();

    //@ts-ignore
    delete user.password;
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
}
