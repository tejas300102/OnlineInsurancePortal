// PolicyRoutes.js
import express from "express";
import {
    getPolicies,
    getPolicyById,
    addPolicy,
    updatePolicy,
    deletePolicy,
} from "../controller/PolicyController.js";

import {
    purchasePolicy,
    getUserPurchases,
    getAllPurchases,
} from "../controller/PurchaseController.js";

const router = express.Router();

router.get("/", getPolicies);
router.get("/:id", getPolicyById);
router.post("/add", addPolicy);
router.put("/update/:id", updatePolicy);
router.delete("/delete/:id", deletePolicy);

router.post("/purchase", purchasePolicy);
router.get("/purchases/:user_id", getUserPurchases);
router.get("/purchases", getAllPurchases);

export default router;
