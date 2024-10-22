import { Request, Response, NextFunction } from 'express';
import { productsTable } from '../../db/productsSchema';
import { db } from '../../db';
import { eq } from 'drizzle-orm';

export async function listProducts(
  req: Request,
  res: Response<any>,
  next: NextFunction
) {
  try {
    const products = await db.select().from(productsTable);

    res.json(products);
  } catch (err) {
    next(err);
  }
}

export async function getProductById(
  req: Request,
  res: Response<any>,
  next: NextFunction
) {
  const id = Number(req.params.id);

  try {
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(id)));

    if (!product) {
      res.status(404).send({ message: 'Product not found' });
      return;
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
}

export async function createProduct(
  req: Request,
  res: Response<any>,
  next: NextFunction
) {
  try {
    const [product] = await db
      .insert(productsTable)
      .values(req.cleanBody)
      .returning();

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

export async function updateProduct(
  req: Request,
  res: Response<any>,
  next: NextFunction
) {
  const id = Number(req.params.id);
  const updatedFields = req.cleanBody;

  try {
    const [product] = await db
      .update(productsTable)
      .set(updatedFields)
      .where(eq(productsTable.id, id))
      .returning();

    if (!product) {
      res.status(404).send({ message: 'Product not Found' });
      return;
    }

    res.status(200).json({ message: 'Successfully updated', product });
  } catch (err) {
    next(err);
  }
}

export async function deleteProduct(
  req: Request,
  res: Response<any>,
  next: NextFunction
) {
  const id = Number(req.params.id);

  try {
    const [deleted] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, id))
      .returning();

    if (!deleted) {
      res.status(404).send({ message: 'Product not Found' });
      return;
    }

    res.status(204).json({ message: 'Successfully deleted', deleted });
  } catch (err) {
    next(err);
  }
}

// export async function receivedLikes(
//   req: Request,
//   res: Response<any>,
//   next: NextFunction

// ) {
//   try {

//   }catch (err) {
//     next(err);
//   }

// }
