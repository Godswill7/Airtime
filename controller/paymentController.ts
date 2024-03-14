// import { initiatePaystackTransaction } from './payStack';
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

     if (!userID || !receipientNumber || !amount) {
       return res.status(HTTP.BAD_REQUEST).json({
         message: "Invalid request data",
         status: HTTP.BAD_REQUEST,
       });
    }
    
     const user: any = await authModel.findById(userID);

    if (!user) {
      return res.status(HTTP.BAD_REQUEST).json({
          message: "User does not exist",
          status:HTTP.BAD_REQUEST
      });
    }


    if (user.walletBalance < amount) {
      return res.status(HTTP.BAD_REQUEST).json({
          message: "Insufficient Funds to complete transfer !!!",
          status:HTTP.BAD_REQUEST
      });
    }

    const updateWalletBalance = user.walletBalance - amount;

    await authModel.findByIdAndUpdate(userID, {
      walletBalance: updateWalletBalance,
    });

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

// export const creditAccountExternally = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const { userID } = req.params;
//     const { amount } = req.body;

//     if (!userID || !amount) {
//       return res.status(HTTP.BAD_REQUEST).json({
//         message: "Invalid request data",
//         status: HTTP.BAD_REQUEST,
//       });
//     }

//     const user = await authModel.findById(userID);

//     if (!user) {
//       return res.status(HTTP.BAD_REQUEST).json({
//         message: "User does not exist",
//         status: HTTP.BAD_REQUEST,
//       });
//     }

//     const accessCode = await initiatePaystackTransaction({
//       email: user.email,
//       amount: amount * 100,
//       callback_url: "https://your-callback-url.com",
//       metadata: {
//         custom_fields: [
//           {
//             display_name: "User ID",
//             variable_name: "user_id",
//             value: userID,
//           },
//         ],
//       },
//     });

//     return res.status(HTTP.OK).json({
//       message: "Paystack transaction initiated successfully",
//       accessCode,
//     });
//   } catch (error:any) {
//     console.error(`Error initiating Paystack transaction: ${error.message}`);
//     return res.status(HTTP.BAD_REQUEST).json({
//       message: "Internal Server Error",
//       status: HTTP.BAD_REQUEST,
//     });
//   }
// };


