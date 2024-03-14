import { Application, NextFunction, Request, Response, json } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { HTTP, errorHandler } from "./utils/interface";
import { mainError } from "./error/mainError";
import auth from "./router/authRouter";
import payment from "./router/paymentRouter";

export const mainApp = (app: Application) => {
  app.use(json());
  app.use(cors());
  app.use(morgan("dev"));
  app.use(helmet());

  app.use("/api", auth);
  app.use("/api", payment);

  app.get("/", (req: Request, res: Response) => {
    try {
      return res.status(HTTP.OK).json({
        message: "Airtime API is ready",
      });
    } catch (error: any) {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "error on API route",
        data: error.message,
      });
    }
  });

  app
    .all("*", (req: Request, res: Response, next: NextFunction) => {
      new mainError({
        name: `This is an API Route Error`,
        status: HTTP.BAD_REQUEST,
        success: false,
        message: `This is happening as a result of invalid route being this: ${req.originalUrl}`,
      });
    })
    .use(errorHandler);
};
