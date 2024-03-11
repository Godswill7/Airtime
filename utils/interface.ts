import { Document } from "mongoose";

interface iAuth {
    name: string;
    email: string;
    password: string;
    wallet: {};
}

export interface iAuthData extends iAuth, Document {}