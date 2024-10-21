import { Router } from 'express';

import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  listProducts,
} from './products.handler';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  productSchemaCreate,
  productSchemaUpdate,
} from '../../db/productsSchema';

const router = Router();

router.get('/', listProducts);
router.get('/:id', getProductById);
router.post('/', validateRequest(productSchemaCreate), createProduct);
router.put('/:id', validateRequest(productSchemaUpdate), updateProduct);
router.delete('/:id', deleteProduct);

export default router;
