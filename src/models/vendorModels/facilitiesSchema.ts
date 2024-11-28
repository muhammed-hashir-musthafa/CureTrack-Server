import mongoose, { Schema, Document, Types } from "mongoose";
import { IHospitalFacility } from "../../interfaces/vendorInterfaces";

const AmbulanceSchema: Schema = new Schema({
  vehicleNumber: { type: String, required: true },
  vehicleType: { type: String, required: true },
  driverName: { type: String, required: true },
  contactNumber: { type: String, required: true },
});

const FacilitySchema: Schema = new Schema({
  name: { type: String, required: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
  type: { type: String, enum: ["number", "text"], required: true },
  editable: { type: Boolean, default: true },
});

const HospitalFacilitySchema: Schema = new Schema(
  {
    hospitalId: { type: String, required: true, unique: true },
    facilities: [FacilitySchema],
    ambulances: [AmbulanceSchema],
  },
  { timestamps: true }
);

export const HospitalFacility = mongoose.model<IHospitalFacility>(
  "HospitalFacility",
  HospitalFacilitySchema
);
