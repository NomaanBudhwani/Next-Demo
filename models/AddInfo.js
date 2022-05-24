import mongoose from "mongoose";
import shortid from "shortid";
const { String, Number } = mongoose.Schema.Types;

const AddInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

export default mongoose.models.add_info ||
    mongoose.model("add_info", AddInfoSchema);
