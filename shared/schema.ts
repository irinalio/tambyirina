
import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

// Base order info
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  type: text("type").notNull(), // 'ready' | 'semi' | 'custom'
  status: text("status").notNull().default("pending"),
  totalPrice: integer("total_price").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// For Semi-Standard (Interactive) figurines
export const semiStandardItems = pgTable("semi_standard_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.id),
  pose: text("pose").notNull(), // holding_hands, hugging
  skinColor: text("skin_color").notNull(),
  hairStyle: text("hair_style").notNull(),
  outfitColor: text("outfit_color").notNull(),
  dressType: text("dress_type").notNull(),
});

// For Ready-made (Standard) figurines
export const readyMadeItems = pgTable("ready_made_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.id),
  productId: text("product_id").notNull(),
});

// Details for fully personalized figurines (from photos)
export const customRequests = pgTable("custom_requests", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.id),
  description: text("description").notNull(),
  photoUrls: text("photo_urls").array().notNull(), // Array of image URLs
});

// === SCHEMAS ===

export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true });
export const insertSemiStandardItemSchema = createInsertSchema(semiStandardItems).omit({ id: true, orderId: true });
export const insertReadyMadeItemSchema = createInsertSchema(readyMadeItems).omit({ id: true, orderId: true });
export const insertCustomRequestSchema = createInsertSchema(customRequests).omit({ id: true, orderId: true });

// === TYPES ===

export type Order = typeof orders.$inferSelect;
export type SemiStandardItem = typeof semiStandardItems.$inferSelect;
export type ReadyMadeItem = typeof readyMadeItems.$inferSelect;
export type CustomRequest = typeof customRequests.$inferSelect;

// Combined Request Types for API
export const createReadyOrderSchema = z.object({
  customer: insertOrderSchema.pick({ customerName: true, customerEmail: true, totalPrice: true }),
  details: insertReadyMadeItemSchema,
});

export const createSemiOrderSchema = z.object({
  customer: insertOrderSchema.pick({ customerName: true, customerEmail: true, totalPrice: true }),
  details: insertSemiStandardItemSchema,
});

export const createCustomOrderSchema = z.object({
  customer: insertOrderSchema.pick({ customerName: true, customerEmail: true, totalPrice: true }),
  details: insertCustomRequestSchema,
});

export type CreateReadyOrderRequest = z.infer<typeof createReadyOrderSchema>;
export type CreateSemiOrderRequest = z.infer<typeof createSemiOrderSchema>;
export type CreateCustomOrderRequest = z.infer<typeof createCustomOrderSchema>;
