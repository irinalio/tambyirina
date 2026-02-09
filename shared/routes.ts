
import { z } from 'zod';
import { 
  createReadyOrderSchema,
  createSemiOrderSchema, 
  createCustomOrderSchema, 
  orders,
  semiStandardItems,
  readyMadeItems,
  customRequests
} from './schema';

// ============================================
// SHARED ERROR SCHEMAS
// ============================================
export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

// ============================================
// API CONTRACT
// ============================================
export const api = {
  orders: {
    createReady: {
      method: 'POST' as const,
      path: '/api/orders/ready',
      input: createReadyOrderSchema,
      responses: {
        201: z.object({
          order: z.custom<typeof orders.$inferSelect>(),
          details: z.custom<typeof readyMadeItems.$inferSelect>(),
        }),
        400: errorSchemas.validation,
      },
    },
    createSemi: {
      method: 'POST' as const,
      path: '/api/orders/semi',
      input: createSemiOrderSchema,
      responses: {
        201: z.object({
          order: z.custom<typeof orders.$inferSelect>(),
          details: z.custom<typeof semiStandardItems.$inferSelect>(),
        }),
        400: errorSchemas.validation,
      },
    },
    createCustom: {
      method: 'POST' as const,
      path: '/api/orders/custom',
      input: createCustomOrderSchema,
      responses: {
        201: z.object({
          order: z.custom<typeof orders.$inferSelect>(),
          details: z.custom<typeof customRequests.$inferSelect>(),
        }),
        400: errorSchemas.validation,
      },
    },
    upload: {
      method: 'POST' as const,
      path: '/api/upload',
      // input is multipart/form-data, handled manually in handler
      responses: {
        200: z.object({
          url: z.string(),
        }),
        400: errorSchemas.validation,
      },
    }
  },
};

// ============================================
// HELPER
// ============================================
export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
