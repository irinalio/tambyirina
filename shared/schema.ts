
import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

// Base order info
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  type: text("type").notNull(), // 'standard' | 'custom'
  status: text("status").notNull().default("pending"), // pending, confirmed, shipping, delivered
  totalPrice: integer("total_price").notNull(), // in cents
  createdAt: timestamp("created_at").defaultNow(),
});

// Details for standard customized figurines
export const standardItems = pgTable("standard_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.id),
  hairStyle: text("hair_style").notNull(),
  hairColor: text("hair_color").notNull(),
  skinColor: text("skin_color").notNull(),
  outfitStyle: text("outfit_style").notNull(),
  outfitColor: text("outfit_color").notNull(),
  pose: text("pose").notNull().default("standing"),
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
export const insertStandardItemSchema = createInsertSchema(standardItems).omit({ id: true, orderId: true });
export const insertCustomRequestSchema = createInsertSchema(customRequests).omit({ id: true, orderId: true });

// === TYPES ===

export type Order = typeof orders.$inferSelect;
export type StandardItem = typeof standardItems.$inferSelect;
export type CustomRequest = typeof customRequests.$inferSelect;

// Combined Request Types for API
export const createStandardOrderSchema = z.object({
  customer: insertOrderSchema.pick({ customerName: true, customerEmail: true, totalPrice: true }),
  details: insertStandardItemSchema,
});

export const createCustomOrderSchema = z.object({
  customer: insertOrderSchema.pick({ customerName: true, customerEmail: true, totalPrice: true }),
  details: insertCustomRequestSchema,
});

export type CreateStandardOrderRequest = z.infer<typeof createStandardOrderSchema>;
export type CreateCustomOrderRequest = z.infer<typeof createCustomOrderSchema>;
