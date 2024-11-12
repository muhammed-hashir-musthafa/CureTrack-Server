import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IAdmins extends Document {
  _id: ObjectId;
  fullName:string,
  email: string;
  phoneNumber: string;
  password: string;
  createdAt: Date;
  profileImage: string | null;
  notifications: ObjectId[] | null;
  createdBy: string | null;
  isDelete: boolean | null;
  isActive: boolean | null;
  deletedBy: string | null;
  isVerified: boolean;
  refreshToken?: string;
  role: string;
}

const AdminsSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now() },
    profileImage: { type: String },
    notifications: [{ type: Schema.Types.ObjectId }],
    createdBy: { type: String },
    isDelete: { type: Boolean },
    isActive: { type: Boolean },
    deletedBy: { type: String },
    isVerified: { type: Boolean, default: false },
    refreshToken: { type: String, default: null },
    role: {type:String, default:"admin"}
  },
  { timestamps: true }
);

const Admins = mongoose.model<IAdmins>("Admins", AdminsSchema);

export default Admins;
