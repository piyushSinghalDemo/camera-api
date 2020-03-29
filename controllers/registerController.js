const registerserviceObj = require("../services/registerservice");
const registervalidateObj = require("../validation/registervalidation");
const Responder = require("./errorhandler");
const User = require("../models/user");
const _ = require("lodash");
const moment = require('moment');
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
module.exports.getProfile = async function (req, res) {
    try {
        let data = req.user;
        //let hospital = await HospitalService.fetchHospitalByUser(req.user.id);
        return Responder.respondWithSuccess(req, res, {
            user: data,
            'hospital': ""
        }, "Profile User");
    } catch (error) {
        return Responder.respondWithError(req, res, error);
    }
};
module.exports.updatePasswordForCurrentUser = async function (req, res) {
    try {
        await registervalidateObj.registerPasswordValidation(req.body);
        let reqBody = req.body;
        let result = await registerserviceObj.setPassword(req.user.id, reqBody);
        if (result.isValidationError) {
            return Responder.respondWithError(req, res, result.message);
        }
        return Responder.respondWithSuccess(req, res, null, result.message);
    } catch (error) {
        if (error.isValidationError) {
            return Responder.respondWithValidationError(req, res, error.message);
        }
        return Responder.respondWithError(req, res, error.message);
    }
};
module.exports.changePasswordForUser = async function (req, res) {
    try {
        await registervalidateObj.changePasswordForUserValidation(req.body);
        let reqBody = req.body;
        let result = await registerserviceObj.setPasswordForUser(req.body.id, reqBody);
        if (result.isValidationError) {
            return Responder.respondWithError(req, res, result.message);
        }
        return Responder.respondWithSuccess(req, res, null, result.message);
    } catch (error) {
        if (error.isValidationError) {
            return Responder.respondWithValidationError(req, res, error.message);
        }
        return Responder.respondWithError(req, res, error.message);
    }
}
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
module.exports.setPasswordAfterRegistration = async function (req, res) {
    try {
        let reqBody = req.body;
        if (reqBody.old_password) {
            await registervalidateObj.setNewPasswordValidation(req.body);
        } else {
            await registervalidateObj.registerPasswordValidation(req.body);
        }
        let result = await registerserviceObj.setPassword(req.user.id, reqBody);
        if (result.isValidationError) {
            return Responder.respondWithError(req, res, result.message);
        }
        return Responder.respondWithSuccess(req, res, null, result.message);
    } catch (error) {
        if (error.isValidationError) {
            return Responder.respondWithValidationError(req, res, error.message);
        }
        return Responder.respondWithError(req, res, error.message);
    }
};
module.exports.getUser = async function (req, res) {
    try {
        let result = await registerserviceObj.getUser(req.params.user_id);
        if (!result) {
            return Responder.respondWithNotFoundError(req, res, "No such User exists");
        }
        return Responder.respondWithSuccess(req, res, result);
    } catch (error) {
        return Responder.respondWithError(req, res, error.message);
    }
}