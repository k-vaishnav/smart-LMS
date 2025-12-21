import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    courses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    }],
    amount:"Number",
    paymentStatus:{
        type: String,
        enum: ["Pending", "Success", "Failed"],
        default: "Pending",
    },
    paymentIntentId:"String",
    
},{timestamps:true});

const Order = mongoose.model("Order", orderSchema);

export default Order;