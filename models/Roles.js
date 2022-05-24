import mongoose from "mongoose";
import shortid from "shortid";
const { String, Number } = mongoose.Schema.Types;

const RolesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

export default mongoose.models.role || mongoose.model("role", RolesSchema);
