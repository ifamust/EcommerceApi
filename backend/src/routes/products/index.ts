import { Router } from 'express';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  listProducts,
} from './products.handler.js';
import {
  productSchemaCreate,
  productSchemaUpdate,
} from '../../db/productsSchema.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { verifySeller, verifyToken } from '../../middlewares/authMiddleware.js';

const router = Router();

router.get('/', listProducts);
router.get('/:id', getProductById);
router.post(
  '/',
  verifyToken,
  verifySeller,
  validateRequest(productSchemaCreate),
  createProduct
);
router.put(
  '/:id',
  verifyToken,
  verifySeller,
  validateRequest(productSchemaUpdate),
  updateProduct
);
router.delete('/:id', verifyToken, verifySeller, deleteProduct);

export default router;
