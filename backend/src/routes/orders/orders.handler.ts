import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { db } from '../../db/index.js';
import { orderItemsTable, ordersTable } from '../../db/ordersSchema.js';

export async function createOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { order, items } = req.cleanBody;
    const userId = req.userId;
    if (!userId) {
      res.status(400).json({ message: 'Invalid order data' });
    }
    //TODO: fix type error
    const [newOrder] = await db
      .insert(ordersTable)
      //@ts-ignore
      .values({ userId: userId })
      .returning();

    //TODO: validate product ids, and take their actual price from db
    //get all order items
    const orderItems = items.map((item: any) => ({
      ...item,
      orderId: newOrder.id,
    }));

    const newOrderItems = await db
      .insert(orderItemsTable)
      .values(orderItems)
      .returning();

    res.status(201).json({ ...newOrder, items: newOrderItems });
  } catch (err) {
    next(err);
  }
}

//TODO:
//if req.role is admin, return all orders
//if req.role is seller, return orders by seller
//else, return only orders filtered by req.userId
export async function listOrders(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const orders = await db.select().from(ordersTable);
    res.json(orders);
  } catch (err) {
    next(err);
  }
}

export async function updateOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);

    const [updateOrder] = await db
      .update(ordersTable)
      .set(req.body)
      .where(eq(ordersTable.id, id))
      .returning();

    if (!updateOrder) {
      res.status(404).send('Order not found');
    }

    res.status(200).json(updateOrder);
  } catch (err) {
    next(err);
  }
}

export async function getOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);

    //TODO: Replace with query after setup the relationship
    // const result = await db.query.ordersTable.findFirst({
    //     where: eq(ordersTable.id, id),
    //     with: {
    //         items: true
    //     },
    // });

    const orderWithItems = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.id, id))
      .leftJoin(orderItemsTable, eq(ordersTable.id, orderItemsTable.orderId));

    if (orderWithItems.length === 0) {
      res.status(404).send('Order not found');
    }
    const orders = {
      ...orderWithItems[0].orders,
      items: orderWithItems.map((item) => item.order_items),
    };

    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
}
