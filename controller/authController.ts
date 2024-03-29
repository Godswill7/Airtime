// import { sendAccountMail } from "./../utils/email";
import { Request, Response } from "express";
import { HTTP } from "../utils/interface";
import authModel from "../model/authModel";
import { hash, genSalt, compare } from "bcrypt";
import { randomBytes } from "crypto";
import { sign } from "jsonwebtoken";
import env from "dotenv";
env.config();

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const encrypt = await genSalt(10);
    const decipher = await hash(password, encrypt);
    const token = randomBytes(2).toString("hex");

     const usernameBase = email.split("@")[0];

     const randomNum = Math.floor(Math.random() * 10000).toString();

     const username = `${usernameBase}_${randomNum}`;

    const user = await authModel.create({
      userName:username,
      email,
      token,
      password: decipher,
    });

    // sendAccountMail(user).then(() => {
    //   console.log("Mail Sent ...");
    // });

    return res.status(HTTP.CREATED).json({
      message: "User created Successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error creating User",
      data: error.message,
    });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await authModel.findOne({ email });

    if (!user) {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "User is not found",
      });
    }

    if (!user.verified && user.token !== "") {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "user has not been verified",
      });
    }

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "Password is incorrect",
      });
    }

    const token = sign({ id: user?._id, email: user?.email }, "token");

    return res.status(HTTP.CREATED).json({
      message: `Welcome Back ${user.email}`,
      data: token,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "error signing in user",
      data: error.message,
    });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const getUser = await authModel.findById(userID);

    if (getUser) {
      const realUser = await authModel.findByIdAndUpdate(
        getUser._id,
        { verified: true, token: "" },
        { new: true }
      );
      return res.status(HTTP.UPDATE).json({
        message: "user Verified",
        data: realUser,
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "token Invalid / User does not exist",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error verifying user",
      data: error,
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID } = req.params;

    await authModel.findByIdAndDelete(userID);

    return res.status(HTTP.DELETE).json({
      message: "User deleted",
    });
  } catch (error: any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error deleting User",
      data: error.message,
    });
  }
};

export const findAllUser = async (req: Request, res: Response) => {
  try {
    const findAllUser = await authModel.find();

    return res.status(HTTP.OK).json({
      message: "All Users Successfully found",
      data: findAllUser,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error finding all User",
      data: error.message,
    });
  }
};

export const findOneUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const findUser = await authModel.findById(userID);

    return res.status(HTTP.OK).json({
      message: "User Successfully found",
      data: findUser,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error finding one User",
      data: error.message,
    });
  }
};
