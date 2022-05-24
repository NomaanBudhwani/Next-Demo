import mongoose from "mongoose";
import shortid from "shortid";
const { String, Number } = mongoose.Schema.Types;

const DepartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    abbr: {
        type: String,
    },
});

export default mongoose.models.department ||
    mongoose.model("department", DepartmentSchema);
