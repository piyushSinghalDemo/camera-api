const User = require("../models/user");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
var config = require("../config/config");
useragent = require('express-useragent');
var ObjectId = require('mongoose').Types.ObjectId;
module.exports.createUser = async (user_id, data) => {
    let user = await User.findOne({
        mobile: data.mobile
    }).select('_id');
    if (user) {
        return {
            status: false,
            data: user,
            message: "User already exists"
        };
    }
    let obj = {
        mobile: data.mobile,
        role: "admin",
        password: data.password
    };
    user = await User.create(obj);


    return {
        status: true,
        data: {},
        message: "User Created successfully!"
    };
}
module.exports.addToCart = async function (user_id, data) {
    let updateObject = {
        quantity: data.quantity,
        product_id: data.product_id
    }
    let query = {
        _id: new ObjectId(user_id)
    }
    let res = await User.updateOne(query, {
        $push: {
            cart: updateObject
        }
    })
    return {
        status: true,
        data: res,
        message: "Cart Updated successfully!"
    };
}
module.exports.cartDetails = async function (user_id) {
    let query = {
        _id: new ObjectId(user_id)
    }
    let res = await User.find(query, {
        cart: 1
    }).populate({
        path: "cart.product_id",
        populate: {
            path: "category",
            select: "name model"
        }
    })
    // .populate("cart.product_id", "name description price make category")

    return {
        status: true,
        data: res,
        message: "Cart Fatched successfully!"
    };
}
module.exports.loginByUser = async function (reqBody, authHeader, authUserAgent) {
    let _this = this;
    return new Promise(async function (resolve, reject) {
        let user = await User.findOne({
            mobile: reqBody.username
        });
        await _this.authenticateLoginByUser(reqBody, user, authUserAgent)
            .then(function (result) {
                resolve(result);
            })
            .catch(function (error) {
                resolve({
                    error: true,
                    message: error
                });
            });
    });
};
module.exports.authenticateLoginByUser = async function (reqBody, user, authUserAgent) {
    let _this = this;
    return new Promise(async function (resolve, reject) {
        if (!user) {
            reject({
                message: "User doesn't exists!",
                isValidationError: true
            });
        }
        if (!reqBody.password) {
            reject({
                message: "Invalid request!",
                isValidationError: true
            });
        }
        let token = await _this.generateToken(user);
        //- to send response
        let data = user;
        //-if user login with password
        if (!_.isEmpty(reqBody.password)) {
            let password = reqBody.password;
            let isPasswordValid = await user.verifyPassword(password);
            if (!isPasswordValid) {
                reject({
                    message: "Invalid Password!",
                    isValidationError: true
                });
            }
            resolve({
                token: token,
                message: "Login successfully!",
                data: {
                    mobile: data.mobile,
                    role: data.role
                }
            });
        } else {
            reject({
                message: 'Invalid Request!',
                isValidationError: true
            });
        }
    });
};
module.exports.getUser = async function (user_id) {
    let user = await User.findOne({
        _id: user_id
    }, {
        password: -1
    });
    return user;
};
module.exports.setPasswordForUser = async function (userId, inputData) {
    let user = await User.findOne({
        _id: userId
    });
    if (!user) {
        return {
            isValidationError: true,
            message: "User doesn't exists"
        };
    }
    user.password = inputData.password;
    await user.save();
    return {
        message: 'Password Changed'
    };
};
module.exports.setPassword = async function (userId, inputData) {
    let user = await User.findOne({
        _id: userId
    });
    if (!user) {
        return {
            isValidationError: true,
            message: "User doesn't exists"
        };
    }
    if (inputData.old_password) {
        let isPasswordValid = await user.verifyPassword(inputData.old_password);
        if (!isPasswordValid) {
            return {
                message: 'Old Password not match',
                isValidationError: true
            };
        }
    }
    user.password = inputData.password;
    await user.save();
    return {
        message: 'Password Changed'
    };
};
module.exports.generateToken = async function (user) {
    var payload = {
        id: user.id,
        role: user.role,
        exp: moment()
            .add(config.jwt.timeout, "m")
            .valueOf(),
        mobile: user.mobile
    };
    let token = jwt.sign(
        JSON.parse(JSON.stringify(payload)),
        config.jwt.jwtSecret
    );
    return token;
};