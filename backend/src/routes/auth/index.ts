import { Router } from 'express';
import { login, register } from './auth.handler.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { UserSchemaCreate, UserSchemaLogin } from '../../db/usersSchema.js';

const router = Router();

router.post('/register', validateRequest(UserSchemaCreate), register);

router.post('/login', validateRequest(UserSchemaLogin), login);

export default router;
