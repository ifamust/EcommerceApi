import { Router } from 'express';
import { login, register } from './auth.handler';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserSchemaCreate, UserSchemaLogin } from '../../db/usersSchema';

const router = Router();

router.post('/register', validateRequest(UserSchemaCreate), register);

router.post('/login', validateRequest(UserSchemaLogin), login);

export default router;
