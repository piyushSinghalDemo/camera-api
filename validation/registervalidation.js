const Joi = require('@hapi/joi');
const constants = require('../constants/constants')
const User = require("../models/user");
const {
    ObjectId
} = require("mongodb");
module.exports.createUserValidation = async function (data) {
    const createRegisterSchema = Joi.object().keys({
        mobile: Joi.string().required(),
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