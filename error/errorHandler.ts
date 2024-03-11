import { NextFunction, Request, Response } from "express";
import { HTTP } from "../utils/interface";
import { mainError } from "./mainError";

const errorBuilder = (err: mainError, res: Response) => {
  res.status(HTTP.BAD_REQUEST).json({
    name: err.name,
    message: err.message,
    status: err.status,
    success: err.success,
    stack: err.stack,
  });
};

export default errorBuilder;
