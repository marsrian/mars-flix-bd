import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String
        },
        designation: {
            type: String,
            default: ""
        },
        avatar: {
            type: Object,
            default: {}
        },
        mobile:{
            type: String,
            default: ""
        },
        location: {
            type: String,
            default: ""
        },
        about: {
            type: String,
            default: ""
        },
    },
    {timestamps: true}
)

export default mongoose?.models?.User || mongoose.model("User", UserSchema)