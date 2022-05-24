import mongoose from "mongoose";
import shortid from "shortid";
const { String, Number } = mongoose.Schema.Types;

const FilingStatusSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});

export default mongoose.models.filing_status ||
    mongoose.model("filing_status", FilingStatusSchema);
