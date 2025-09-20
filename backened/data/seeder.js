import fs from "fs";
import Category from "../models/CategoryModel.js";
import Course from "../models/CourseModel.js"
import User from "../models/UserModel.js";
import path from 'path';
import dotenv from "dotenv";
import bcrypt from 'bcrypt';
dotenv.config();
import connectDB from '../config/db.js';
// connect to db
connectDB();
const __dirname = path.resolve();


const importData = async () => {
    try {
        console.log('Clearing database!');
        // clean the database
        await User.deleteMany();
        await Course.deleteMany();
        await Category.deleteMany();

        // insert the data
        console.log("__dirname", __dirname);

        // insert user data
        const usersData = JSON.parse(fs.readFileSync(path.join(__dirname, '/data/users.json'), 'utf-8'));

        const usersWithHashedPassword = usersData.map((user) => {
            // create password hash
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(user.password, salt);
            return {...user, password: hashedPassword};
        });

        const createdUsers = await User.insertMany(usersWithHashedPassword);

        const instructorUser = createdUsers.find((user) => user.role === 'instructor')  // to be used in course as ref
        

        // insert category data
        const categoryData = JSON.parse(fs.readFileSync(path.join(__dirname, '/data/category.json'), 'utf-8'));
        const createdCategory = await Category.insertMany(categoryData);

        const webdevCategory = createdCategory.find((category) => category.name === 'Web Dev')// to be used in course as ref

        // insert course
        const courses = [{
            title: 'Complete Web dev course 2025',
            description: 'Random text about the course: command not found: asdfsdf',
            price: 99,
            instructor: instructorUser.id,
            category: webdevCategory.id
        }]

        await Course.insertMany(courses);

        console.log('Data is successfully added to database!');
        process.exit();
    } catch (error) {
        console.log("Error while adding data: ", error);
        process.exit(1);
    }

}
// remove data
const destroyData = async () => {
    // deleteMany queries will go here!
    // clean the database
    await User.deleteMany();
    await Course.deleteMany();
    await Category.deleteMany();
    console.log("Data destroyed")
    process.exit();

}

// logic to add script to run seed file for different methods
if (process.argv[2] === '-d') {

    destroyData();
} else {
    importData();
    console.log("import data");
}