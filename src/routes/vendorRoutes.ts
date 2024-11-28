import express, { Router } from "express";
import { signUp } from "../controllers/vendorControllers/signupController";
import {
  addDoctor,
  deleteDoctor,
  filterDoctorsByCategory,
  getDoctorById,
  getDoctorsByHospitalId,
} from "../controllers/vendorControllers/doctorController";
import {
  addNewAmbulance,
  addNewFacility,
  deleteAmbulance,
  deleteFacility,
  getAllAmbulance,
  getAllFacilities,
  updateAmbulance,
  updateFacility,
} from "../controllers/vendorControllers/hospitalController";

const vendorsRoutes: Router = express.Router();

vendorsRoutes.post("/signup", signUp);

//Hospital
vendorsRoutes.post("/hospital/addDoctor", addDoctor);
vendorsRoutes.get("/hospital/getDoctors/:vendorId", getDoctorsByHospitalId);
vendorsRoutes.get("/hospital/getDoctor/:id", getDoctorById);
vendorsRoutes.get("/hospital/getDoctorsByCategory", filterDoctorsByCategory);
vendorsRoutes.delete("/hospital/deleteDoctor/:id", deleteDoctor);

//Hospital Facilities
vendorsRoutes.get("/:hospitalId/facilities", getAllFacilities);
vendorsRoutes.get("/:hospitalId/ambulances", getAllAmbulance);
vendorsRoutes.post("/:hospitalId/facilities", addNewFacility);
vendorsRoutes.post("/:hospitalId/ambulances", addNewAmbulance);
vendorsRoutes.patch("/:hospitalId/facilities/:id", updateFacility);
vendorsRoutes.patch("/:hospitalId/ambulances/:id", updateAmbulance);
vendorsRoutes.delete("/:hospitalId/ambulances/:id", deleteAmbulance);
vendorsRoutes.delete("/:hospitalId/facilities/:id", deleteFacility);

export default vendorsRoutes;
