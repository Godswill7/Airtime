import { Router } from "express";
import { payments } from "../controller/payStack";

const router = Router();

router.route("/:userID/paystack-pay").post(payments)

export default router;
