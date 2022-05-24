import mongoose from "mongoose";
import shortid from "shortid";
const { String, Number, ObjectId, Boolean } = mongoose.Schema.Types;

const DependentsSchema = new mongoose.Schema({
    client_id: {
        type: ObjectId,
        ref: "client",
        required: true,
    },
    relationship_id: {
        type: ObjectId,
        ref: "relationship",
        required: true,
    },
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
});

export default mongoose.models.dependent ||
    mongoose.model("dependent", DependentsSchema);
