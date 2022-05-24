import mongoose from "mongoose";
import shortid from "shortid";
const { String, Number } = mongoose.Schema.Types;

const RelationshipSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

export default mongoose.models.relationship ||
    mongoose.model("relationship", RelationshipSchema);
