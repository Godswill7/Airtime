import { Document } from "mongoose";

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
