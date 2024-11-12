import express from "express";
import { signUp } from "../controllers/adminControllers/signupController";
import { getAllVendors } from "../controllers/adminControllers/getAllVendors";
 

const adminRoutes = express.Router();

adminRoutes.post("/signup", signUp);



//fetching vendors
adminRoutes.get('/vendors/:vendorName', getAllVendors);

export { adminRoutes };
