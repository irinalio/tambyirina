
import { db } from "./db";
import {
  orders,
  semiStandardItems,
  readyMadeItems,
  customRequests,
  type CreateReadyOrderRequest,
  type CreateSemiOrderRequest,
  type CreateCustomOrderRequest,
  type Order,
  type SemiStandardItem,
  type ReadyMadeItem,
  type CustomRequest
} from "@shared/schema";

export interface IStorage {
  createReadyOrder(data: CreateReadyOrderRequest): Promise<{ order: Order; details: ReadyMadeItem }>;
  createSemiOrder(data: CreateSemiOrderRequest): Promise<{ order: Order; details: SemiStandardItem }>;
  createCustomOrder(data: CreateCustomOrderRequest): Promise<{ order: Order; details: CustomRequest }>;
}

export class DatabaseStorage implements IStorage {
  async createReadyOrder(data: CreateReadyOrderRequest): Promise<{ order: Order; details: ReadyMadeItem }> {
    return await db.transaction(async (tx) => {
      const [newOrder] = await tx.insert(orders).values({
        customerName: data.customer.customerName,
        customerEmail: data.customer.customerEmail,
        totalPrice: data.customer.totalPrice,
        type: 'ready',
        status: 'pending'
      }).returning();

      const [newDetails] = await tx.insert(readyMadeItems).values({
        orderId: newOrder.id,
        ...data.details
      }).returning();

      return { order: newOrder, details: newDetails };
    });
  }

  async createSemiOrder(data: CreateSemiOrderRequest): Promise<{ order: Order; details: SemiStandardItem }> {
    return await db.transaction(async (tx) => {
      const [newOrder] = await tx.insert(orders).values({
        customerName: data.customer.customerName,
        customerEmail: data.customer.customerEmail,
        totalPrice: data.customer.totalPrice,
        type: 'semi',
        status: 'pending'
      }).returning();

      const [newDetails] = await tx.insert(semiStandardItems).values({
        orderId: newOrder.id,
        ...data.details
      }).returning();

      return { order: newOrder, details: newDetails };
    });
  }

  async createCustomOrder(data: CreateCustomOrderRequest): Promise<{ order: Order; details: CustomRequest }> {
    return await db.transaction(async (tx) => {
      const [newOrder] = await tx.insert(orders).values({
        customerName: data.customer.customerName,
        customerEmail: data.customer.customerEmail,
        totalPrice: data.customer.totalPrice,
        type: 'custom',
        status: 'pending'
      }).returning();

      const [newDetails] = await tx.insert(customRequests).values({
        orderId: newOrder.id,
        ...data.details
      }).returning();

      return { order: newOrder, details: newDetails };
    });
  }
}

export const storage = new DatabaseStorage();
