const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const config = require('../config/config')
const request = require('request')
const User = require('../models/user');
const isValidToken = async function (token) {
    try {
        if (token) {
            token = token.replace('JWT ', '').replace('Bearer ', '');
            return {
                valid: true,
                data: await jwt.verify(token, config.jwt.jwtSecret),
                token: token
            }
        }
        return {
            valid: false,
            message: "Unauthorized"
        };
    } catch (error) {
        return {
            valid: false,
            message: "Invalid Token"
        };
    }
}
module.exports.isValidToken = isValidToken;
module.exports.VerifyToken = async function (req, res, next) {
    // //  get the token from the request
    try {
        let token = await isValidToken(req.headers["authorization"]);
        if (!token.valid) {
            return res.status(401).json({
                status: false,
                message: token.message,
                data: ""
            })
        }
        let query = {};
        if (token.data.user_id) {
            query.user_id = token.data.user_id = token.data.user_id;
        } else {
            query._id = token.data.id;
        }
        let user = await User.findOne(query);
        if (!user) {
            return res.status(401).json({
                status: false,
                message: "User Not Found",
                data: ""
            })
        }
        req.user = {
            id: user.id,
            mobile: user.mobile,
            role: user.role,
            token: token.token,
        };
        req.token = token.token;
        next()
    } catch (error) {
        return res.status(401).json({
            status: false,
            message: "Something went wrong!!",
            error,
            data: ""
        })
    }
}