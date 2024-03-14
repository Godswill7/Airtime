// const PAYSTACK_API_KEY = process.env.PAYSTACK_KEY!;
// const PAYSTACK_TRANSACTION_URL =
//   "https://api.paystack.co/transaction/initialize";

// export const initiatePaystackTransaction =  async(
//   data: PaystackTransactionData
// ): Promise<string> => {
//   try {
//     const response: AxiosResponse<any> = await axios.post(
//       PAYSTACK_TRANSACTION_URL,
//       data,
//       {
//         headers: {
//           Authorization: `Bearer ${PAYSTACK_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     // Return the Paystack access_code
//     return response.data.data.access_code;
//   } catch (error: any) {
//     throw new Error(`Paystack transaction initiation failed: ${error.message}`);
//   }
// }
// sk_test_ec1b0ccabcb547fe0efbd991f3b64b485903c88e

// export const payment = async (req: Request, res: Response) => {
//   try {
//     const { amount } = req.body;

//     const params = JSON.stringify({
//       email: "customer@email.com",
//       amount: amount * 100,
//     });

//     const options = {
//       hostname: "api.paystack.co",
//       port: 443,
//       path: "/transaction/initialize",
//       method: "POST",
//       headers: {
//         Authorization:
//           "Bearer ",
//         "Content-Type": "application/json",
//       },
//     };

//     const ask = https
//       .request(options, (resp) => {
//         let data = "";

//         resp.on("data", (chunk) => {
//           data += chunk;
//         });

//         resp.on("end", () => {
//           console.log(JSON.parse(data));
//           res.status(HTTP.OK).json({
//             message: "Payment successful",
//             data: JSON.parse(data),
//           });
//         });
//       })
//       .on("error", (error) => {
//         console.error(error);
//       });

//     ask.write(params);
//     ask.end();
//   } catch (error) {
//     return res.status(HTTP.BAD_REQUEST).json({
//       message: "Error making Payment",
//     });
//   }
// };
