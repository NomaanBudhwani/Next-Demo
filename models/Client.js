import mongoose from "mongoose";
import shortid from "shortid";

const { String, Number, Boolean, Date, ObjectId } = mongoose.Schema.Types;

const ClientSchema = new mongoose.Schema({
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
    occupation: {
        type: String,
        //required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    dod: {
        type: Date,
        //required: true,
    },
    legallyBlind: {
        type: Boolean,
        //required: true,
    },
    totallyDisabled: {
        type: Boolean,
        //required: true,
    },
    claimedDependent: {
        type: Boolean,
        //required: true,
    },
    pef: {
        type: Boolean,
        //required: true,
    },
    homePhone: {
        type: String,
        //required: true,
    },
    workPhone: {
        type: String,
        required: true,
    },
    cellPhone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    idType: {
        type: ObjectId,
        ref: "add_info",
        required: true,
    },
    idNumber: {
        type: Number,
        required: true,
    },
    idState: {
        type: String,
        required: true,
    },
    idIssueDate: {
        type: Date,
        required: true,
    },
    idExpDate: {
        type: Date,
        required: true,
    },
    statusOnReturn: {
        type: ObjectId,
        ref: "filing_status",
        required: true,
    },
    statusToDate: {
        type: ObjectId,
        ref: "filing_status",
        required: true,
    },
    spouseFirstName: {
        type: String,
        //required: true,
    },
    spouseMiddleInitial: {
        type: String,
        //required: true,
    },
    spouseLastName: {
        type: String,
        //required: true,
    },
    spouseSuffix: {
        type: String,
        //required: true,
    },
    spouseSsn: {
        type: String,
        //required: true,
    },
    spouseOccupation: {
        type: String,
        //required: true,
    },
    spouseDob: {
        type: String,
        //required: true,
    },
    spouseDod: {
        type: String,
        //required: true,
    },
    spouseLegallyBlind: {
        type: Boolean,
        //required: true,
    },
    spouseTotallyDisabled: {
        type: Boolean,
        //required: true,
    },
    spouseClaimedDependent: {
        type: Boolean,
        //required: true,
    },
    spousePef: {
        type: Boolean,
        //required: true,
    },
    Street: {
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
});

export default mongoose.models.Client || mongoose.model("Client", ClientSchema);
