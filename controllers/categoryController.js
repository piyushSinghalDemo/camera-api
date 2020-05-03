const categoryServiceObj = require("../services/categoryService");
const Responder = require("./errorhandler");
module.exports.categoryList = async function (req, res) {
    try {
        let data = await categoryServiceObj.categoryList(req.body);
        return Responder.respondWithSuccess(req, res, data.data, data.message);
    } catch (error) {
        return Responder.respondWithError(req, res, error);
    }
};
module.exports.saveCategory = async function (req, res) {
    try {
        let data = await categoryServiceObj.saveCategory(req.body);
        return Responder.respondWithSuccess(req, res, data.data, data.message);
    } catch (error) {
        return Responder.respondWithError(req, res, error);
    }
};