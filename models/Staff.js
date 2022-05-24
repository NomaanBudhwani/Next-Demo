import mongoose from "mongoose";
import shortid from "shortid";

const { String, Number, Boolean, Date, ObjectId } = mongoose.Schema.Types;

const StaffSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    middleInitial: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    suffix: {
        type: String,
        //required: true,
    },
    ssn: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    aptSuite: {
        type: String,
        //required: false,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zipCode: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    cellPhone: {
        type: String,
        required: true,
    },
    alternatePhone: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    supervisorId: {
        type: ObjectId,
        ref: "staff",
        required: false,
    },
    departmentId: {
        type: ObjectId,
        ref: "department",
        required: true,
    },
    workLocationId: {
        type: ObjectId,
        ref: "work_location",
        required: true,
    },
    roleId: {
        type: ObjectId,
        ref: "role",
        required: true,
    },
    emailAssigned: {
        type: String,
        required: true,
    },
    workPhone: {
        type: String,
        //required: true,
    },
    salary: {
        type: Number,
        //required: true,
    },
    spouseSuffix: {
        type: String,
        //required: true,
    },
    joiningDate: {
        type: Date,
        //required: true,
    },
    fullNameECI: {
        type: String,
        //required: true,
    },
    streetECI: {
        type: String,
        //required: true,
    },
    aptSuiteECI: {
        type: String,
        //required: true,
    },
    cityECI: {
        type: String,
        //required: true,
    },
    stateECI: {
        type: String,
        //required: true,
    },
    zipCodeECI: {
        type: String,
        //required: true,
    },
    countryECI: {
        type: String,
        //required: true,
    },
    primaryPhoneECI: {
        type: String,
        //required: true,
    },
    alternatePhoneECI: {
        type: String,
        //required: true,
    },
    relationshipECI: {
        type: String,
        //required: true,
    },
});

export default mongoose.models.staff || mongoose.model("staff", StaffSchema);
