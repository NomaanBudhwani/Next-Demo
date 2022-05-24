import mongoose from "mongoose";
import shortid from "shortid";
const { String, Number } = mongoose.Schema.Types;

const RelationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

export default mongoose.models.relation ||
    mongoose.model("relation", RelationSchema);
