import mongoose from "mongoose";
import shortid from "shortid";
const { String, Number, ObjectId, Boolean } = mongoose.Schema.Types;

const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    token: {
        type: String,
        select: false,
    },
    roleId: {
        type: ObjectId,
        ref: "role",
        required: true,
    },
    staffId: {
        type: ObjectId,
        ref: "staff",
        required: true,
    },
    isFirstLogin: {
        type: Boolean,
        default: false,
    },
    isDeactivated: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.models.user || mongoose.model("user", UsersSchema);
