import mongoose from 'mongoose';
const CartSchema = new mongoose.Schema({
    course:{type:mongoose.Schema.Types.ObjectId,ref:'Course'},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    addedAt:{type:Date,default:Date.now}
})

export default mongoose.model('Cart',CartSchema);