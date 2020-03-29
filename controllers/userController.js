const userserviceObj = require("../services/userService");
const userValidator = require('../validation/userValidation');
const Responder = require("./errorhandler");
module.exports.activateUser = async function (req, res) {
    try {
        let response = await userserviceObj.activateUser(req.query);
        if (response.status) {
            return Responder.respondWithSuccess(req, res, response.data, "success");
        } else {
            return Responder.respondWithError(req, res, response.message);
        }
    } catch (error) {
        return Responder.respondWithError(req, res, error.message);
    }
};
module.exports.search = async (req, res) => {
    try {
        await userValidator.search(req.body);
        let data = await userserviceObj.listAll(req.body.page_no, req.body.page_size, req.body.search_text);
        return Responder.respondWithSuccess(req, res, data, 'Users Listed');
    } catch (error) {
        return Responder.respondWithError(req, res, error.message);
    }
};
module.exports.getUserDetails = async function (req, res) {
    try {
        let {
            data
        } = await userserviceObj.userDetails(req.user);
        return Responder.respondWithSuccess(req, res, data, "success");
    } catch (error) {
        return Responder.respondWithError(req, res, error.message);
    }
};
module.exports.getUserDetails = async function (req, res) {
    try {
        let response = await userserviceObj.userDetails(req.query, req.user);
        if (response.status) {
            return Responder.respondWithSuccess(req, res, response.data, "success");
        } else {
            return Responder.respondWithError(req, res, response.message);
        }
    } catch (error) {
        return Responder.respondWithError(req, res, error.message);
    }
};
module.exports.getBasicProfile = async function (req, res) {
    try {
        let {
            data,
            message
        } = await userserviceObj.getBasicProfile(req.user);
        return Responder.respondWithSuccess(req, res, data, message);
    } catch (error) {
        return Responder.respondWithError(req, res, error.message);
    }
};
//  SEND OTP TO UPDATE MOBILE OR EMAIL
module.exports.generateLoginCreds = async (req, res) => {
    try {
        let {
            user_id
        } = req.user;
        let response = await userserviceObj.generateLoginCreds(user_id);
        return response.isError ? Responder.respondWithError(req, res, response.message) :
            Responder.respondWithSuccess(req, res, {}, response.message);
    } catch (error) {
        return Responder.respondWithError(req, res, error.message);
    }
};
module.exports.updateUserMobileDataInfo = async (req, res) => {
    try {
        req.body.user_mobile = req.user.mobile
        req.body.user_id = req.user.id
        await userValidator.updateUserMobileDataInfoVal(req.body);
        let responseData = await userserviceObj.updateUserMobileDataInfo(req.body);
        if (responseData.isError == true) {
            return Responder.respondWithError(req, res, responseData.message);
        } else {
            return Responder.respondWithSuccess(req, res, responseData.data, responseData.message);
        }
    } catch (error) {
        return Responder.respondWithError(req, res, error.message)
    }
}
//  VERIFY OTP TO UPDATE MOBILE OR EMAIL
module.exports.verifyLoginCreds = async (req, res) => {
    try {
        let {
            id
        } = req.user;
        await userValidator.verifyLoginCreds(req.body);
        let response = await userserviceObj.verifyLoginCreds(req.body, id);
        return response.isError ? Responder.respondWithError(req, res, response.message) :
            Responder.respondWithSuccess(req, res, {}, response.message);
    } catch (error) {
        return Responder.respondWithError(req, res, error.message);
    }
};
module.exports.nameChangeRequest = async (req, res) => {
    try {
        let {
            user_id
        } = req.user;
        await userValidator.nameChangeRequestValidation(req.body);
        let response = await userserviceObj.nameChangeRequest(req.body, user_id);
        if (response.status) {
            return Responder.respondWithSuccess(req, res, response.data, response.message);
        } else {
            return Responder.respondWithError(req, res, response.message);
        }
    } catch (error) {
        return Responder.respondWithError(req, res, error.message);
    }
};
module.exports.storeUserNotification = async (req, res) => {
    try {
        await userValidator.storeNotification(req.body);
    } catch (error) {
        return Responder.respondWithValidationError(req, res, error);
    }
    let {
        user_id
    } = req.body;
    let response = await userserviceObj.storeUserNotification(req.body, user_id);
    return response.isError ? Responder.respondWithFailure(req, res, response.message) :
        Responder.respondWithSuccess(req, res, response.data, response.message);
};
module.exports.getUserNotifications = async (req, res) => {
    let {
        id
    } = req.user;
    let response = await userserviceObj.getUserNotifications(req.query, id);
    return response.isError ? Responder.respondWithFailure(req, res, response.message) :
        Responder.respondWithSuccess(req, res, response.data, response.message);
};
module.exports.markUserNotificationRead = async (req, res) => {
    let {
        notification_id
    } = req.params;
    let {
        id
    } = req.user;
    let response = await userserviceObj.markUserNotificationRead(notification_id, id);
    return response.isError ? Responder.respondWithFailure(req, res, response.message) :
        Responder.respondWithSuccess(req, res, response.data, response.message);
}
module.exports.markAllUserNotificationRead = async (req, res) => {
    let response = await userserviceObj.markAllUserNotificationRead(req.user.id, req.body.ids);
    return response.isError ? Responder.respondWithFailure(req, res, response.message) :
        Responder.respondWithSuccess(req, res, response.data, response.message);
}
module.exports.createPdf = async (req, res) => {
    let pdfGenerator = new pdfGenService().load('example').create({
        firstName: 'Ank',
        lastName: 'V'
    });
    // console.log(pdfGenerator.render());
    pdfGenerator.build('abc');
    // return res.send(pdfGenerator.render());
    return pdfGenerator.download(res);
};