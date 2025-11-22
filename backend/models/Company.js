import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        phone: {
            type: String,
        },
        address: {
            type: String,
        },
        logo: {
            type: String,
        },
        subscriptionPlan: {
            type: String,
            enum: ["free", "standard", "premium"],
            default: "free",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);
export default Company;
