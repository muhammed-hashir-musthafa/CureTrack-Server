import { Request, Response } from "express";
import DoctorSchema from "../../models/doctorModels/doctorSchema";
import VendorSchema from "../../models/vendorModels/vendorsSchema";

export const addDoctor = async (req: Request, res: Response) => {
  try {
    const newDoctor = new DoctorSchema(req.body);
    await newDoctor.save();
    res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      doctor: newDoctor,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error adding doctor", error });
  }
};

export const getDoctorsByHospitalId = async (req: Request, res: Response) => {
  try {
    const vendorId = req.params.vendorId;
    const vendor = await VendorSchema.findById(vendorId).populate(
      "doctors.doctorId"
    );

    if (!vendor) {
      res.status(404).json({ success: false, message: "Hospital not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Doctors fetched succesfully",
      doctors: vendor.doctors,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error fetching doctors", error });
  }
};

export const deleteDoctor = async (req: Request, res: Response) => {
  try {
    const doctorId = req.params.id;

    const doctor = await DoctorSchema.findById(doctorId);

    if (!doctor) {
      res.status(404).json({ success: false, message: "Doctor not found" });
      return;
    }

    await DoctorSchema.deleteOne({ _id: doctorId });

    res
      .status(200)
      .json({ success: true, message: "Doctor deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error deleting doctor", error });
  }
};

export const getDoctorById = async (req: Request, res: Response) => {
  try {
    const doctorId = req.params.id;
    const doctor = await DoctorSchema.findById(doctorId);

    if (!doctor) {
      res.status(404).json({ success: false, message: "Doctor not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Doctors fetched by id successfully",
      doctor,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error fetching doctor", error });
  }
};

export const filterDoctorsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.body;
    const doctors = await DoctorSchema.find({
      specialization: { $in: category },
    });

    if (doctors.length === 0) {
      res.status(404).json({
        success: false,
        message: "No doctors found for the given category",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Doctors categorized successfully ",
      doctors,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error filtering doctors", error });
  }
};

export const searchDoctors = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const doctors = await DoctorSchema.find({
      $or: [
        { fullName: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
      ],
    });

    if (doctors.length === 0) {
      res.status(404).json({ success: false, message: "No doctors found" });
      return;
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Doctors searched successfully ",
        doctors,
      });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error searching doctors", error });
  }
};
