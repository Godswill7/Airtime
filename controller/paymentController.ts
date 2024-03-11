import { randomBytes } from "crypto";
import { Request, Response } from "express";
import { HTTP } from "../utils/interface";
import paymentModel from "../model/paymentModel";
import authModel from "../model/authModel";
import { v4 as uuidv4 } from "uuid";

export const createPayment = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { receipientNumber, amount } = req.body;

    if (!userID) {
      return res.status(HTTP.BAD_REQUEST).json({
          message: "User does not exist",
          status:HTTP.BAD_REQUEST
      });
    }

    const user: any = await authModel.findById(userID);

    if (user.walletBalance < amount) {
      return res.status(HTTP.BAD_REQUEST).json({
          message: "Insufficient Funds to complete transfer !!!",
          status:HTTP.BAD_REQUEST
      });
    }

    //   const timestamp = Date.now().toString();
    //   const random = Math.floor(Math.random() * 10000).toString();
    //   const transactionID = `${timestamp}-${random}`;

    const encryptedToken = randomBytes(2).toString("hex");
    const generateTransactionID = uuidv4();

    const payment = new paymentModel({
      userID,
      transactionID: generateTransactionID,
      amount,
      secureToken: encryptedToken,
      receipientNumber,
    });

    await payment.save();

    return res.status(HTTP.CREATED).json({
      message: "Payment created successfully",
      payment,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: `Error making payment request: ${error.message}`,
      status: HTTP.BAD_REQUEST,
    });
  }
};
