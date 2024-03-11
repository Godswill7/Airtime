import { Document } from "mongoose";
import errorBuilder from "../error/errorHandler";
import { Request, Response,NextFunction } from "express";
import { mainError } from "../error/mainError";


export const errorHandler = (
  err: mainError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  errorBuilder(err, res);
};
export interface iError {
  name: string;
  message: string;
  status: HTTP;
  success: boolean;
}

export enum HTTP {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 404,
  UPDATE = 201,
  DELETE = 204,
}
interface iUser {
  userName: string;
  email: string;
  phoneNumber: string;
  password: string; 
  image: string; 
  imageID: string; 
  verified: boolean;
  token: string; 
  walletBalance: string;
}

interface iPayment {
  userID: string;
  transactionID: string;
  amount: number;
  secureToken: string;
}

export interface iUserData extends iUser, Document {}
export interface iPaymentData extends iPayment, Document {}
