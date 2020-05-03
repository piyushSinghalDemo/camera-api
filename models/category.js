const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Mirrorless', 'full frame', 'point and shoot'],
    },
    model: {
        type: Number,
        required: true
    }
});
module.exports = mongoose.model('category', categorySchema, 'category')