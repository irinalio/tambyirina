
import { db } from "./db";
import {
  orders,
  standardItems,
  customRequests,
  type CreateStandardOrderRequest,
  type CreateCustomOrderRequest,
  type Order,
  type StandardItem,
  type CustomRequest
} from "@shared/schema";

export interface IStorage {
  createStandardOrder(data: CreateStandardOrderRequest): Promise<{ order: Order; details: StandardItem }>;
  createCustomOrder(data: CreateCustomOrderRequest): Promise<{ order: Order; details: CustomRequest }>;
}

export class DatabaseStorage implements IStorage {
  async createStandardOrder(data: CreateStandardOrderRequest): Promise<{ order: Order; details: StandardItem }> {
    return await db.transaction(async (tx) => {
      const [newOrder] = await tx.insert(orders).values({
        customerName: data.customer.customerName,
        customerEmail: data.customer.customerEmail,
        totalPrice: data.customer.totalPrice,
        type: 'standard',
        status: 'pending'
      }).returning();

      const [newDetails] = await tx.insert(standardItems).values({
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
