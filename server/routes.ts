
import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";
import express from "express";

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), "client", "public", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Standard Order
  app.post(api.orders.createStandard.path, async (req, res) => {
    try {
      const input = api.orders.createStandard.input.parse(req.body);
      const result = await storage.createStandardOrder(input);
      res.status(201).json(result);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Custom Order
  app.post(api.orders.createCustom.path, async (req, res) => {
    try {
      const input = api.orders.createCustom.input.parse(req.body);
      const result = await storage.createCustomOrder(input);
      res.status(201).json(result);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // File Upload
  // Note: serving /uploads is handled by the static file middleware in server/index.ts usually,
  // or we can explicitly serve it if needed. For now, assuming client/public is served.
  app.post(api.orders.upload.path, upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    // Return relative path that can be accessed from frontend
    const url = `/uploads/${req.file.filename}`;
    res.json({ url });
  });

  return httpServer;
}
