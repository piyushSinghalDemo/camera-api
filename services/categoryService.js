const Category = require("../models/category");
module.exports.categoryList = async (data) => {
    category = await Category.find({});
    return {
        status: true,
        data: category,
        message: "data fatched successfully!"
    };
}
module.exports.saveCategory = async (data) => {
    user = await Category.create(data);
    return {
        status: true,
        data: {},
        message: "Category Created successfully!"
    };
}