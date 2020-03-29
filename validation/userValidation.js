const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const NOTIFICATION_TYPES = require('../constants/constants').NOTIFICATION_TYPES;
module.exports = {
    //  VERIFY OTP TO UPDATE MOBILE OR EMAIL
    verifyLoginCreds: data => {
        let inputObj = Joi.object().keys({
            otp: Joi.string().required(),
            mobile: Joi.string().trim().regex(/^[0][1-9]\d{9}$|^[1-9]\d{9}$/).required().error(new Error('Mobile Number is not correct')),
        });
        return Joi.validate(data, inputObj)
    },
    updateUserMobileDataInfoVal: data => {
        let inputObj = Joi.object().keys({
            user_id: Joi.string().required(),
            old_mobile: Joi.string().required(),
            user_mobile: Joi.string().valid(Joi.ref('old_mobile')).required().error(new Error('unatuthication')),
            new_mobile: Joi.string().length(10).trim().regex(/^[0][1-9]\d{9}$|^[1-9]\d{9}$/).required().error(new Error('mobile number is not correct')),
            re_enter_mobile: Joi.string().valid(Joi.ref('new_mobile')).required().error(new Error('mobile do not match'))
        });
        return Joi.validate(data, inputObj)
    },
    nameChangeRequestValidation: data => {
        let inputObj = Joi.object().keys({
            requested_by_user: Joi.string().required(),
            request_type: Joi.string().required(),
            change_data: Joi.object().keys({
                new_first_name: Joi.string().required(),
                new_last_name: Joi.string().required(),
                new_middle_name: Joi.string().optional(),
                affidavit_link: Joi.string().required(),
            })
        });
        return Joi.validate(data, inputObj)
    },
    storeNotification: data => {
        let inputObj = Joi.object().keys({
            center_id: Joi.string().required(),
            user_id: Joi.string().required(),
            message: Joi.string().required(),
            type: Joi.string().required(),
            data: Joi.object(),
            role: Joi.string().valid(['patient', 'doctor']),
            transport: Joi.object().required().keys({
                mediums: Joi.array().items(Joi.string().required().valid(['sms', 'email', 'socket', 'fcm']))
            })
        });
        return Joi.validate(data, inputObj)
    },
    search: data => {
        let inputObj = Joi.object().keys({
            page_no: Joi.number().min(1).optional(),
            page_size: Joi.number().min(1).max(100).optional(),
            search_text: Joi.string().optional().allow("")
        });
        return Joi.validate(data, inputObj);
    }
};