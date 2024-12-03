import { Types } from "mongoose";

export interface SignUpBody {
  name: string;
  email: string;
  phoneNumber: string;
  vendorRole: "hospital" | "lab" | "pharmacy";
  license: string;
  password: string;
}

export interface IAmbulance {
  vehicleNumber: string;
  vehicleType: string;
  _id?: string; // MongoDB uses _id as the unique identifier
  driverName: string;
  contactNumber: string;
}

export interface IFacility {
  _id?: string; // MongoDB uses _id as the unique identifier
  name: string;
  value: string | number;
  type: "number" | "text";
  editable: boolean;
}

export interface IHospitalFacility extends Document {
  facilities: IFacility[];
  hospitalId: string;
  ambulances: IAmbulance[];
}
