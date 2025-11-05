// import express from "express";
// import { connectDb } from "./src/configs/dbconfigs.js";
// import { registerUser } from "./src/controller/UserController.js";
// import { login } from "./src/controller/LoginController.js";
// import { getAllUsers, getUserPolicies } from "./src/controller/AdminController.js";
// import { verifyToken } from "./src/Middleware/VerifyToken.js";
// import { addPolicy } from "./src/controller/PolicyController.js";

// const app = express();
// app.use(express.json());

// app.post("/register", registerUser);                                   //works
// app.post("/login", login);                                             //works
// app.post("/admin/addpolicy", addPolicy);                               //works

// app.get("/admin/getusers", verifyToken, getAllUsers);                   //works
// app.get("/admin/userpolicies", getUserPolicies);                       //works


// app.listen(7000, () => {
//     connectDb();
// });


import express from "express";
import cors from "cors";
import { connectDb } from "./src/configs/dbconfigs.js";
import { registerUser } from "./src/controller/UserController.js";
import { login } from "./src/controller/LoginController.js";
import { adminLogin, getAllUsers, getUserPolicies } from "./src/controller/AdminController.js";
import { verifyToken } from "./src/Middleware/VerifyToken.js";
import { addPolicy, getPolicies } from "./src/controller/PolicyController.js";



// Routes
import UserRoutes from "../backend/src/Routes/UserRoutes.js"
import ClaimRoutes from "../backend/src/Routes/ClaimRoutes.js";

import PurchaseRoutes from "../backend/src/Routes/PurchaseRoutes.js"
import PolicyRoutes from "../backend/src/Routes/PolicyRoutes.js"
import AdminRoutes from "../backend/src/Routes/AdminRoutes.js"
import LoginRoutes from "../backend/src/Routes/UserRoutes.js"


const app = express();

// ✅ Enable CORS (important)
app.use(cors({
    origin: "http://localhost:5173",   // React app
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(cors());

app.use("/admin", AdminRoutes);
app.use("/policy", PolicyRoutes);
app.use("/claims", ClaimRoutes);

// ✅ Routes
app.post("/register", registerUser);             // works
app.post("/login", login);                       // works
app.post("/admin/addpolicy", addPolicy);         // works
app.post("/admin/login", adminLogin);
app.get("/admin/getusers", verifyToken, getAllUsers);  // works
app.get("/admin/userpolicies", getUserPolicies);       // works

// ✅ Start Server
app.listen(7000, () => {
    connectDb();
    console.log("✅ Server running on port 7000");
});
