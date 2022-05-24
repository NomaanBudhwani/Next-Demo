import mongoose from "mongoose";
import shortid from "shortid";
const { String, Number } = mongoose.Schema.Types;

const WorkLocationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    abbr: {
        type: String,
    },
});

export default mongoose.models.work_location ||
    mongoose.model("work_location", WorkLocationSchema);
