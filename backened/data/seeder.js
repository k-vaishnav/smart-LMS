import fs from "fs";
import Course from "../models/CourseModel.js"
import User from "../models/UserModel.js"
import Category from "../models/CategoryModel.js"
import path from "path";
import bcrypt from "bcrypt"

const importData = async ()=>{
    try{
    //  clear the database
    await Course.deleteMany()
    await Category.deleteMany()
    await User.deleteMany()
    // import the data
    const usersData = JSON.parse(fs.readFileSync(path.join(__dirname,'/data/users.json'),"utf-8"))
    const usersWithHashedPass = usersData.map((user)=>{
        const salt =  bcrypt.genSaltSync(10)
        const hashedpassword = bcrypt.hashSync(user.password,salt)
        return {...user,password:hashedpassword}
    })

    const createdUsers = await User.insertMany(usersWithHashedPass);
    const instructorUser = createdUsers.findOne(user=>user.role === "instructor")

    // insert category data
    const categoryData = JSON.parse(fs.readFileSync(path.join(__dirname,'/data/category.json'),"utf-8"));
    const createdCategory = await Category.insertMany(categoryData);

    const webdevCategory = createdCategory.find(category=>category.name === "Web Dev")
    // insert course data
    const courses = [{
        title:"Complete Web Dev Course 2025",
        description :"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        price:199.99,
        category:webdevCategory.id,
        instructor:instructorUser.id
    }]

    await Course.insertMany(courses)
    console.log("Data imported successfully");

}
catch(error){
    console.log(error);
}
    
// remove data
const destroyData = ()=>{
    // deleteMany queries will go here!
    console.log("Data destroyed successfully");
}

// logic to add script to run seed file for different methods
}

