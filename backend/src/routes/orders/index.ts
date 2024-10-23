import { Router } from 'express';
import {
  createOrder,
  getOrder,
  listOrders,
  updateOrder,
} from './orders.handler.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import {
  OrderSchemaUpdate,
  OrderSchemaWithItems,
} from '../../db/ordersSchema.js';
import { verifyToken } from '../../middlewares/authMiddleware.js';

const router = Router();

router.post(
  '/',
  verifyToken,
  validateRequest(OrderSchemaWithItems),
  createOrder
);
router.get('/', verifyToken, listOrders);
router.get('/:id', verifyToken, getOrder);
router.put(
  '/:id',
  verifyToken,
  validateRequest(OrderSchemaUpdate),
  updateOrder
);

// router.post('/login', validateRequest(UserSchemaLogin), login);

export default router;
