import Category from "../models/CategoryModel.js";
const getCategory = async (req, res) => {
    try {
        // fetch the categories from the database
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Server error!"});
    }
};

export { getCategory };