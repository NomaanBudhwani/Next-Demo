import mongoose from "mongoose";
import shortid from "shortid";
const { String, Number, ObjectId, Boolean } = mongoose.Schema.Types;

const CompanySchema = new mongoose.Schema({
    client_id: {
        type: ObjectId,
        ref: "client",
        required: true,
    },
    relation_id: {
        type: ObjectId,
        ref: "relation",
        required: true,
    },
    companyName: {
        type: String,
        unique: true,
        required: true,
    },
    companyEmail: {
        type: String,
        required: true,
    },
    ein: {
        type: String,
        unique: true,
        required: true,
    },
    companyType_id: {
        type: ObjectId,
        ref: "company_type",
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    aptSuite: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
    },
    accountingServices: {
        type: Boolean,
    },
    advisoryServices: {
        type: Boolean,
    },
    financingService: {
        type: Boolean,
    },
    taxPreparation: {
        type: Boolean,
    },
});

export default mongoose.models.company ||
    mongoose.model("company", CompanySchema);
