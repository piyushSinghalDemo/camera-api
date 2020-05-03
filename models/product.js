const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const productSchema = new Schema({
    name: {
        type: String
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'category'
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    make: {
        type: Number
    }
});
module.exports = mongoose.model('products', productSchema, 'products')