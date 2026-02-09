import { eq, desc } from "drizzle-orm";
import { db } from "./db";
import {
  orders,
  semiStandardItems,
  readyMadeItems,
  customRequests,
  reviews,
  type CreateReadyOrderRequest,
  type CreateSemiOrderRequest,
  type CreateCustomOrderRequest,
  type CreateReviewRequest,
  type Order,
  type SemiStandardItem,
  type ReadyMadeItem,
  type CustomRequest,
  type Review,
} from "@shared/schema";

export interface IStorage {
  createReadyOrder(data: CreateReadyOrderRequest): Promise<{ order: Order; details: ReadyMadeItem }>;
  createSemiOrder(data: CreateSemiOrderRequest): Promise<{ order: Order; details: SemiStandardItem }>;
  createCustomOrder(data: CreateCustomOrderRequest): Promise<{ order: Order; details: CustomRequest }>;
  getApprovedReviews(): Promise<Review[]>;
  createReview(data: CreateReviewRequest): Promise<Review>;
}

export class DatabaseStorage implements IStorage {
  async createReadyOrder(data: CreateReadyOrderRequest): Promise<{ order: Order; details: ReadyMadeItem }> {
    return await db.transaction(async (tx) => {
      const [newOrder] = await tx.insert(orders).values({
        customerName: data.customer.customerName,
        customerEmail: data.customer.customerEmail,
        totalPrice: data.customer.totalPrice,
        type: 'ready',
        status: 'pending',
      }).returning();

      const [newDetails] = await tx.insert(readyMadeItems).values({
        orderId: newOrder.id,
        ...data.details,
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
        status: 'pending',
      }).returning();

      const [newDetails] = await tx.insert(semiStandardItems).values({
        orderId: newOrder.id,
        ...data.details,
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
        status: 'pending',
      }).returning();

      const [newDetails] = await tx.insert(customRequests).values({
        orderId: newOrder.id,
        ...data.details,
      }).returning();

      return { order: newOrder, details: newDetails };
    });
  }

  async getApprovedReviews(): Promise<Review[]> {
    return await db
      .select()
      .from(reviews)
      .where(eq(reviews.approved, true))
      .orderBy(desc(reviews.createdAt));
  }

  async createReview(data: CreateReviewRequest): Promise<Review> {
    const [newReview] = await db.insert(reviews).values({
      ...data,
      approved: true,
    }).returning();
    return newReview;
  }
}

export const storage = new DatabaseStorage();
