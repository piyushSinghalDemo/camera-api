const productService = require("../services/productService");
const Responder = require("./errorhandler");
module.exports.productList = async function (req, res) {
    try {
        let data = await productService.productList();
        return Responder.respondWithSuccess(req, res, data.data, data.message);
    } catch (error) {
        return Responder.respondWithError(req, res, error);
    }
};
module.exports.productListCategoryWise = async function (req, res) {
    try {
        let data = await productService.productListCategoryWise(req.query);
        return Responder.respondWithSuccess(req, res, data.data, data.message);
    } catch (error) {
        return Responder.respondWithError(req, res, error);
    }
};
module.exports.saveProduct = async function (req, res) {
    try {
        let data = await productService.saveProduct(req.body);
        return Responder.respondWithSuccess(req, res, data.data, data.message);
    } catch (error) {
        return Responder.respondWithError(req, res, error);
    }
};