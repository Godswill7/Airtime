import { Application, NextFunction, Request, Response, json } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { HTTP } from "./error/mainError";

export const mainApp = (app: Application) => {
  app.use(json());
  app.use(cors());
  app.use(morgan("dev"));
  app.use(helmet());

  app.get("/", (req: Request, res: Response) => {
    try {
      return res.status(HTTP.OK).json({
        message: "API is Active 🚀🚀🚀",
      });
    } catch (error: any) {
      console.log(error.message);
      return res.status(HTTP.BAD).json({
        message: `Error with this API ${error.message}`,
      });
    }
  });

//     app.get("*", (req: Request, res: Response,next:NextFunction) => {
//       new 
//   });
};
