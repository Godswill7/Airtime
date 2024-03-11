import { Schema, model } from "mongoose";
import { iPaymentData } from "../utils/interface";


const paymentModel = new Schema<iPaymentData>({
    userID: {
        type: String,
    },
    transactionID: {
        type:String,
    },
    amount: {
        type:Number,
    },
    secureToken: {
        type:String,
    }
}, {
    timestamps:true,
})

export default model<iPaymentData>("payment",paymentModel)