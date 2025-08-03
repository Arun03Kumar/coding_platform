import type { NextFunction, Request, Response } from "express";
import { type ZodSchema } from "zod";

export const validateDto =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ ...req.body });
      next();
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
        error: {},
        data: err,
      });
    }
  };
