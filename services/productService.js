const Product = require("../models/product");
var ObjectId = require('mongoose').Types.ObjectId;
module.exports.productList = async () => {
    products = await Product.find({}).populate('category', 'name type model');
    return {
        status: true,
        data: products,
        message: "Products fatched successfully!"
    };
}
module.exports.productListCategoryWise = async (query) => {
    products = await Product.find({
        category: new ObjectId(query.category_id)
    }).populate('category', 'name type model');
    return {
        status: true,
        data: products,
        message: "Products fatched successfully!"
    };
}
module.exports.saveProduct = async (data) => {
    user = await Product.create(data);
    return {
        status: true,
        data: {},
        message: "Product Created successfully!"
    };
}