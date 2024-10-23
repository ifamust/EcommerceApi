import {
  integer,
  pgTable,
  varchar,
  text,
  timestamp,
  doublePrecision,
} from 'drizzle-orm/pg-core';
import { usersTable } from './usersSchema.js';
import { createInsertSchema } from 'drizzle-zod';
import { productsTable } from './productsSchema.js';
import { z } from 'zod';

export const ordersTable = pgTable('orders', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp().notNull().defaultNow(),
  status: varchar({ length: 50 }).notNull().default('New'),

  userId: integer()
    .references(() => usersTable.id)
    .notNull(),
});

export const orderItemsTable = pgTable('order_items', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer()
    .references(() => ordersTable.id)
    .notNull(),
  productId: integer()
    .references(() => productsTable.id)
    .notNull(),
  quantity: integer().notNull(),
  price: doublePrecision().notNull(),
});

//create automatic schema & type
export const OrderSchemaInsert = createInsertSchema(ordersTable).omit({
  id: true,
  userId: true,
  status: true,
  createdAt: true,
});

export const OrderSchemaInsertItems = createInsertSchema(orderItemsTable).omit({
  id: true,
  orderId: true,
});

export const OrderSchemaUpdate = createInsertSchema(ordersTable).pick({
  status: true,
});

export const OrderSchemaWithItems = z.object({
  order: OrderSchemaInsert,
  items: z.array(OrderSchemaInsertItems),
});
