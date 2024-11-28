import express, { Router } from "express";
import { signUp } from "../controllers/vendorControllers/signupController";
import {
  addDoctor,
  deleteDoctor,
  filterDoctorsByCategory,
  getDoctorById,
  getDoctorsByHospitalId,
} from "../controllers/vendorControllers/doctorController";

const vendorsRoutes: Router = express.Router();

vendorsRoutes.post("/signup", signUp);


//Hospital
vendorsRoutes.post("/hospital/addDoctor", addDoctor);
vendorsRoutes.get("/hospital/getDoctors/:vendorId", getDoctorsByHospitalId);
vendorsRoutes.get("/hospital/getDoctor/:id", getDoctorById);
vendorsRoutes.get("/hospital/getDoctorsByCategory", filterDoctorsByCategory);
vendorsRoutes.delete("/hospital/deleteDoctor/:id", deleteDoctor);

export default vendorsRoutes;
