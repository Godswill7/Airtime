import axios, { AxiosResponse } from "axios";
import { HTTP, PaystackTransactionData } from "../utils/interface";
import { Request, Response } from "express";
import https, { RequestOptions } from "https";
import dotenv from "dotenv";
import authModel from "../model/authModel";

dotenv.config();




const paystackApiKey = process.env.PAYSTACK_KEY!;
const paystackInitializeEndpoint = "/transaction/initialize";

// const logError = (error: Error): void => {
//   console.error(`Error: ${error.message}`);
// };

const makePaystackRequest = (
  options: RequestOptions,
  requestData: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const paystackRequest = https.request(options, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        resolve(data);
      });
    });

    paystackRequest.on("error", (error) => {
      reject(error);
    });

    paystackRequest.write(requestData);
    paystackRequest.end();
  });
};

export const payments = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { amount } = req.body;

    if (!amount) {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "Invalid request data",
      });
    }

    const user:any = await authModel.findById(userID);

    const requestData = JSON.stringify({
      email: user.email,
      amount: amount * 100,
    });

    const options: RequestOptions = {
      hostname: "api.paystack.co",
      port: 443,
      path: paystackInitializeEndpoint,
      method: "POST",
      headers: {
        Authorization: `Bearer ${paystackApiKey}`,
        "Content-Type": "application/json",
      },
    };

    const responseData = await makePaystackRequest(options, requestData);
    const parsedData = JSON.parse(responseData);

    console.log(parsedData);

    res.status(HTTP.OK).json({
      message: "Payment successful",
      data: parsedData,
    });
  } catch (error:any) {
    // logError(error);
    res.status(HTTP.BAD_REQUEST).json({
      message: "Error making Payment",
    });
  }
};