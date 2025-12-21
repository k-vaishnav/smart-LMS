import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

const changePassword =async (req,res,next) =>{
    const  {oldPassword,newPassword} =req.body;
    console.log(oldPassword,newPassword); 
    try{
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({message:"User not found!"});
        }
        const isMatch = await bcrypt.compare(oldPassword,user.password);
        if(!isMatch) {
            return res.status(400).json({message:"Old password is incorrect!"});
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword,salt);
            user.password = hashedPassword;
            await user.save();
            return res.status(200).json({message:"Password changed successfully!"});
        }
    }
    catch(error) {
        return res.status(500).json({message:"Server error!"}); 
    }
}

export {changePassword};

