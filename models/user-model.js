import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true,
    },
    email: String,
    password: String,
    cart: {
        type: Array,
        default: [],
    },
    isadmin: Boolean,
    orders: {
        type: Array,
        default: [],
    },
    contact: Number,
})

export default mongoose.model("Owner", userSchema);


