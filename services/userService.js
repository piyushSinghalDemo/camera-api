const moment = require("moment");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
var config = require("../config/config");
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
const User = require("../models/user");
module.exports.activateUser = async function (inputUser) {
    let findQueryForUpdate = {
        _id: ObjectId(inputUser.user_id),
    }
    let updateFieldsQuery = {
        $set: {
            is_active: inputUser.is_active
        }
    }
    let updatedData = await User.updateOne(findQueryForUpdate, updateFieldsQuery);
    return {
        data: updatedData,
        message: 'user updated successfully!'
    };
}
//new search API
module.exports.listAll = async function (pageNo, pageSize, searchText, isActive = true) {
    if (!pageNo || pageNo <= 0) pageNo = 1;
    pageNo = parseInt(pageNo)
    if (!pageSize || pageSize <= 0) pageSize = 50;
    pageSize = parseInt(pageSize);
    if (!searchText) searchText = "";
    const searchRegex = new RegExp('^' + searchText, "i");
    console.log(searchRegex);
    const skip = (pageNo - 1) * pageSize;
    console.log(skip);
    let query = {
        is_active: isActive,
        $or: [{
            mobile: searchRegex
        }]
    };
    console.log(query);
    const users = await User.find(query, '-password -created_on -created_by -updated_on -__v').skip(skip).limit(pageSize);
    const totalCount = await User.count(query);
    return {
        items: users,
        total: totalCount,
        page: pageNo,
        count: users.length
    };
}