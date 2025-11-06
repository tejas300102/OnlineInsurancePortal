// import express from "express";
// import { purchasePolicy, getUserPurchases } from "../controller/PurchaseController.js";

// const router = express.Router();

// router.post("/", purchasePolicy); // POST /purchase

// // router.post("/purchase", purchasePolicy);
// // router.get("/user/:user_id", getUserPurchases);
// router.get("/purchases/user/:user_id", getUserPurchases);
// export default router;


import express from "express";
import { purchasePolicy, getUserPurchases, getAllPurchases } from "../controller/PurchaseController.js";

const router = express.Router();

router.post("/", purchasePolicy);
router.get("/user/:user_id", getUserPurchases);
router.get("/all", getAllPurchases);

export default router;
