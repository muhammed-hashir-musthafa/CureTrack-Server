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
  _id?: Types.ObjectId; // _id is optional
  driverName: string;
  contactNumber: string;
}

export interface IFacility {
  _id?: Types.ObjectId; // _id is optional
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
