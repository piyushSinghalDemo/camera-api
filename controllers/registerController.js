const registerserviceObj = require("../services/registerservice");
const registervalidateObj = require("../validation/registervalidation");
const Responder = require("./errorhandler");
module.exports.createUser = async function (req, res) {
    try {
        await registervalidateObj.createUserValidation(req.body);
        let data = await registerserviceObj.createUser('req.user.id', req.body);
        if (data.status) {
            return Responder.respondWithSuccess(req, res, data.data, data.message);
        } else {
            return Responder.respondWithFailure(req, res, data.data, data.message);
        }
    } catch (error) {
        return Responder.respondWithError(req, res, error);
    }
};

module.exports.loginByUser = async function (req, res) {
    try {
        await registervalidateObj.loginByUserValidation(req.body);
        let result = await registerserviceObj.loginByUser(req.body, req.headers['authorization'], req.headers['user-agent']);
        if (result.isValidationError) {
            return Responder.respondWithValidationError(req, res, result.message);
        } else if (result.error) {
            let message;
            if (typeof (result.message) == "string") {
                message = result.message;
            } else {
                message = result.message.message
            }
            return Responder.respondWithValidationError(req, res, message);
        } else if (result.token) {
            console.log('result.data._id ' + result.data._id);
            // let hospital = await HospitalService.fetchHospitalByUser(result.data._id);
            let resultData = {
                user: result.data,
                'hospital': ""
            };
            return Responder.respondWithToken(req, res, result.token, resultData, result.message, undefined);
        } else {
            console.log('result.data._id ' + result.data._id);
            // let hospital = await HospitalService.fetchHospitalByUser(result.data._id);
            result.data.hospital = 'hospital';
            return Responder.respondWithSuccess(req, res, result.data, result.message);
        }
    } catch (e) {
        return Responder.respondWithError(req, res, e);
    }
};
module.exports.addToCart = async function (req, res) {
    try {
        let data = await registerserviceObj.addToCart(req.user.id, req.body);
        return Responder.respondWithSuccess(req, res, data.data, data.message);
    } catch (error) {
        return Responder.respondWithError(req, res, error);
    }
};
module.exports.cartDetails = async function (req, res) {
    try {
        let data = await registerserviceObj.cartDetails(req.user.id);
        return Responder.respondWithSuccess(req, res, data.data, data.message);
    } catch (error) {
        return Responder.respondWithError(req, res, error);
    }
}