import { Request, Response } from "express";
import { HospitalFacility } from "../../models/vendorModels/facilitiesSchema";
import { IAmbulance, IFacility } from "../../interfaces/vendorInterfaces";

export const getAllFacilities = async (req: Request, res: Response) => {
  try {
    const { hospitalId } = req.params; // Get hospitalId from route parameters
    const hospitalData = await HospitalFacility.findOne({ hospitalId });
    if (!hospitalData) {
      res
        .status(404)
        .json({ success: false, message: "No data found for this hospital" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Facilities fetched successfully",
      data: hospitalData.facilities,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch facilities" });
  }
};

export const getAllAmbulance = async (req: Request, res: Response) => {
  try {
    const { hospitalId } = req.params;
    const hospitalData = await HospitalFacility.findOne({ hospitalId });
    if (!hospitalData) {
      res
        .status(404)
        .json({ success: false, message: "No data found for this hospital" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Ambulances fetched successfully",
      data: hospitalData.ambulances,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch ambulances" });
  }
};

export const addNewFacility = async (req: Request, res: Response) => {
  try {
    const { hospitalId } = req.params;
    const { name, value, type }: IFacility = req.body;

    let hospitalData = await HospitalFacility.findOne({ hospitalId });
    if (!hospitalData) {
      hospitalData = new HospitalFacility({
        hospitalId,
        facilities: [{ name, value, type, editable: true }],
        ambulances: [],
      });
      await hospitalData.save();
      res.status(201).json({
        success: true,
        message: "Facility added successfully",
        data: hospitalData.facilities[0],
      });
      return;
    }

    hospitalData.facilities.push({ name, value, type, editable: true });
    await hospitalData.save();
    res.status(201).json({
      success: true,
      message: "Facility added successfully",
      data: hospitalData.facilities.at(-1),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to add facility" });
  }
};

export const addNewAmbulance = async (req: Request, res: Response) => {
  try {
    const { hospitalId } = req.params;
    const {
      vehicleNumber,
      vehicleType,
      driverName,
      contactNumber,
    }: IAmbulance = req.body;

    let hospitalData = await HospitalFacility.findOne({ hospitalId });
    if (!hospitalData) {
      hospitalData = new HospitalFacility({
        hospitalId,
        facilities: [],
        ambulances: [{ vehicleNumber, vehicleType, driverName, contactNumber }],
      });
      await hospitalData.save();
      res.status(201).json({
        success: true,
        message: "Ambulance added successfully",
        data: hospitalData.ambulances[0],
      });
      return;
    }

    hospitalData.ambulances.push({
      vehicleNumber,
      vehicleType,
      driverName,
      contactNumber,
    });
    await hospitalData.save();
    res.status(201).json({
      success: true,
      message: "Ambulance added successfully",
      data: hospitalData.ambulances.at(-1),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to add ambulance" });
  }
};

export const updateFacility = async (req: Request, res: Response) => {
  try {
    const { hospitalId, id } = req.params; // hospitalId and facility id
    const { value } = req.body;

    const hospitalData = await HospitalFacility.findOne({ hospitalId });
    if (!hospitalData) {
      res
        .status(404)
        .json({ success: false, message: "No data found for this hospital" });
      return;
    }

    // Find the facility by its _id
    const facility = hospitalData.facilities.find(
      (facility) => facility._id?.toString() === id
    );
    if (!facility) {
      res.status(404).json({ success: false, message: "Facility not found" });
      return;
    }

    // Update the value
    facility.value = value;
    await hospitalData.save();

    res.status(200).json({
      success: true,
      message: "Facility updated successfully",
      data: facility,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to update facility" });
  }
};
export const updateAmbulance = async (req: Request, res: Response) => {
  try {
    const { hospitalId, id } = req.params; // hospitalId and ambulance id
    const { field, value } = req.body; // Dynamic field update

    const hospitalData = await HospitalFacility.findOne({ hospitalId });
    if (!hospitalData) {
      res
        .status(404)
        .json({ success: false, message: "No data found for this hospital" });
      return;
    }

    // Find the ambulance by its _id
    const ambulance = hospitalData.ambulances.find(
      (ambulance) => ambulance._id?.toString() === id
    );
    if (!ambulance) {
      res.status(404).json({ success: false, message: "Ambulance not found" });
      return;
    }

    // Update the specific field dynamically
    if (field in ambulance) {
      (ambulance as any)[field] = value; // Use type casting for dynamic key access
      await hospitalData.save();

      res.status(200).json({
        success: true,
        message: "Ambulance updated successfully",
        data: ambulance,
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid field name" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to update ambulance" });
  }
};

export const deleteFacility = async (req: Request, res: Response) => {
  try {
    const { hospitalId, id } = req.params; // hospitalId and facility id

    const hospitalData = await HospitalFacility.findOne({ hospitalId });
    if (!hospitalData) {
      res
        .status(404)
        .json({ success: false, message: "No data found for this hospital" });
      return;
    }

    const facilityIndex = hospitalData.facilities.findIndex(
      (facility) => facility._id?.toString() === id // Convert _id to string for comparison
    );
    if (facilityIndex === -1) {
      res.status(404).json({ success: false, message: "Facility not found" });
      return;
    }

    hospitalData.facilities.splice(facilityIndex, 1); // Remove the facility
    await hospitalData.save();

    res.status(200).json({
      success: true,
      message: "Facility deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to delete facility" });
  }
};

export const deleteAmbulance = async (req: Request, res: Response) => {
  try {
    const { hospitalId, id } = req.params; // hospitalId and ambulance id

    const hospitalData = await HospitalFacility.findOne({ hospitalId });
    if (!hospitalData) {
      res
        .status(404)
        .json({ success: false, message: "No data found for this hospital" });
      return;
    }

    const ambulanceIndex = hospitalData.ambulances.findIndex(
      (ambulance) => ambulance._id?.toString() === id // Convert _id to string for comparison
    );
    if (ambulanceIndex === -1) {
      res.status(404).json({ success: false, message: "Ambulance not found" });
      return;
    }

    hospitalData.ambulances.splice(ambulanceIndex, 1); // Remove the ambulance
    await hospitalData.save();

    res.status(200).json({
      success: true,
      message: "Ambulance deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to delete ambulance" });
  }
};
