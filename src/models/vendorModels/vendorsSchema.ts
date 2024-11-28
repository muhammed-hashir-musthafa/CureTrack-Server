import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IVendor extends Document {
  vendorRole: "hospital" | "lab" | "pharmacy";
  name: string;
  password: string;
  email: string;
  isVerified: boolean;
  license: string;
  address: {
    buildingNumber?: string;
    city?: string;
    country?: string[];
    pincode?: number;
    state?: string[];
    street?: string;
  };
  serviceOffered: Record<string, any>[];
  licenseExpiry?: Date;
  isApprovedByAdmin?: boolean;
  vendorStatus?: string[];
  doctors: {
    availableTimings?: string[];
    consultationFee?: number;
    createdAt?: Date;
    doctorId?: ObjectId;
    vendorId?: ObjectId;
  }[];
  phoneNumber: number;
  createdAt: Date;
  operationalHours?: string[];
  labs: {
    _id?: ObjectId;
    tests: {
      availableDays?: Date;
      createdAt?: Date;
      testDescription?: string;
      testName?: string;
      testPrice?: string;
      turnAroundTime?: string;
    }[];
    userReports: Record<string, any>[];
  }[];
  pharmacies: {
    medicines: {
      createdAt?: Date;
      manufacturer?: string;
      medicineId?: string;
      medicineName?: string;
      medicineType?: string;
      prescriptionRequired?: boolean;
      price?: number;
      stock?: number;
    }[];
    orders: {
      createdAt?: Date;
      deliveryDate?: Date;
      isCancel?: boolean;
      isReturn?: boolean;
      orderItems: Record<string, any>[];
      orderStatus?: string;
      orderTotal?: number;
      paymentStatus?: string;
      reason?: string;
    }[];
    userId?: ObjectId;
  }[];
  appointments?: ObjectId[];
  hospital: {
    facilities: {
      ambulances: {
        contactName?: string;
        contactNumber?: number;
        vehicleNumber?: string;
      }[];
      bloodGroup: {
        availability?: number;
      }[];
      ICU: {
        available?: number;
        total?: number;
      };
      insurance: {
        insurancePolicy?: string;
        insuranceType?: string;
      }[];
      ventilators: {
        available?: number;
        total?: number;
      };
    }[];
  }[];
  payment: Record<string, any>[];
  vendorId?: string;
  notification?: ObjectId[];
  subscription?: ObjectId;
  deletedBy?: string;
  isDeleted?: boolean;
  createdBy?: string;
  isActive?: boolean;
}

const VendorSchema: Schema = new Schema(
  {
    vendorRole: {
      type: String,
      required: true,
      enum: ["hospital", "lab", "pharmacy"],
    },
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isVerified: { type: Boolean, default: false },
    license: { type: String, required: true },
    address: {
      buildingNumber: { type: String },
      city: { type: String },
      country: [{ type: String }],
      pincode: { type: Number },
      state: [{ type: String }],
      street: { type: String },
    },
    serviceOffered: [{ type: mongoose.Schema.Types.Mixed }],
    licenseExpiry: { type: Date },
    isApprovedByAdmin: { type: Boolean },
    vendorStatus: [{ type: String }],
    doctors: [
      {
        availableTimings: [{ type: String }],
        consultationFee: { type: Number },
        createdAt: { type: Date, default: Date.now },
        doctorId: { type: Schema.Types.ObjectId },
        vendorId: { type: Schema.Types.ObjectId },
      },
    ],
    phoneNumber: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    operationalHours: [{ type: String }],
    labs: [
      {
        _id: { type: Schema.Types.ObjectId },
        tests: [
          {
            availableDays: { type: Date },
            createdAt: { type: Date },
            testDescription: { type: String },
            testName: { type: String },
            testPrice: { type: String },
            turnAroundTime: { type: String },
          },
        ],
        userReports: [{ type: mongoose.Schema.Types.Mixed }],
      },
    ],
    pharmacies: [
      {
        medicines: [
          {
            createdAt: { type: Date },
            manufacturer: { type: String },
            medicineId: { type: String },
            medicineName: { type: String },
            medicineType: { type: String },
            prescriptionRequired: { type: Boolean },
            price: { type: Number },
            stock: { type: Number },
          },
        ],
        orders: [
          {
            createdAt: { type: Date },
            deliveryDate: { type: Date },
            isCancel: { type: Boolean },
            isReturn: { type: Boolean },
            orderItems: [{ type: mongoose.Schema.Types.Mixed }],
            orderStatus: { type: String },
            orderTotal: { type: Number },
            paymentStatus: { type: String },
            reason: { type: String },
          },
        ],
        userId: { type: Schema.Types.ObjectId },
      },
    ],
    appointments: [{ type: Schema.Types.ObjectId }],
    hospital: [
      {
        facilities: [
          {
            ambulances: [
              {
                contactName: { type: String },
                contactNumber: { type: Number },
                vehicleNumber: { type: String },
              },
            ],
            bloodGroup: [
              {
                availability: { type: Number },
              },
            ],
            ICU: {
              available: { type: Number },
              total: { type: Number },
            },
            insurance: [
              {
                insurancePolicy: { type: String },
                insuranceType: { type: String },
              },
            ],
            ventilators: {
              available: { type: Number },
              total: { type: Number },
            },
          },
        ],
      },
    ],
    payment: [{ type: mongoose.Schema.Types.Mixed }],
    vendorId: { type: String, unique: true },
    notification: [{ type: Schema.Types.ObjectId }],
    subscription: { type: Schema.Types.ObjectId },
    deletedBy: { type: String },
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: String },
    isActive: { type: Boolean },
  },
  { timestamps: true }
);

const Vendor = mongoose.model<IVendor>("Vendor", VendorSchema);

export default Vendor;
