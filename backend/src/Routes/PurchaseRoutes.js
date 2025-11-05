import express from "express";
import { purchasePolicy, getUserPurchases } from "../controller/PurchaseController.js";

const router = express.Router();

router.post("/purchase", purchasePolicy);
router.get("/user/:user_id", getUserPurchases);

export default router;
