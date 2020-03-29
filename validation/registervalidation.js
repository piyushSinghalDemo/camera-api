const Joi = require('@hapi/joi');
const constants = require('../constants/constants')
const User = require("../models/user");
const {
    ObjectId
} = require("mongodb");
module.exports.createUserValidation = async function (data) {
    const createRegisterSchema = Joi.object().keys({
        hospital_name: Joi.string().required(),
        mobile: Joi.string().length(10).regex(/\d{10}/).invalid('Invalid mobile number').required(),
        password: Joi.string().required(),
    });
    return await Joi.validate(data, createRegisterSchema);
};
module.exports.loginByUserValidation = async function (data) {
    const loginSchema = Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
    });
    return await Joi.validate(data, loginSchema);
}
module.exports.registerPasswordValidation = async function (data) {
    const passwordSchema = Joi.object().keys({
        old_password: Joi.string().required(),
        password: Joi.string().min(6).required(),
        confirm_password: Joi.any().valid(Joi.ref('password')).required()
            .options({
                language: {
                    any: {
                        allowOnly: 'Passwords do not match'
                    }
                }
            })
    });
    return await Joi.validate(data, passwordSchema);
}
module.exports.changePasswordForUserValidation = async function (data) {
    const passwordSchema = Joi.object().keys({
        id: Joi.string().required(),
        password: Joi.string().min(6).required(),
        confirm_password: Joi.any().valid(Joi.ref('password')).required()
            .options({
                language: {
                    any: {
                        allowOnly: 'Passwords do not match'
                    }
                }
            })
    });
    return await Joi.validate(data, passwordSchema);
}