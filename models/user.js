const mongoose = require('mongoose')
const Schema = mongoose.Schema
const saltingRounds = 10
const bcrypt = require('bcrypt')
const userSchema = new Schema({
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    hospital_id: {
        type: mongoose.Types.ObjectId,
        ref: 'hospitals'
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    salt: {
        type: String
    },
    role: {
        type: String,
        enum: ['hospital', 'government', 'admin', 'superadmin'],
        default: 'hospital'
    },
    created_on: {
        type: Date,
        default: Date.now()
    },
    created_by: {
        type: mongoose.Types.ObjectId
    },
    is_active: {
        type: Boolean,
        default: true
    }
})
// encrypt password before save
userSchema.pre('save', function (next) {
    const user = this
    if (!user.isModified) {
        // don't rehash if it's an old user
        next()
    } else {
        let hashedPassword = this.hashPassword(user.password)
        user.password = hashedPassword
        next()
    }
})
userSchema.methods.hashPassword = function (password) {
    let user = this
    if (password) {
        let hashedPassword = bcrypt.hashSync(password, saltingRounds)
        return hashedPassword
    } else {
        return password
    }
}
userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}
userSchema.statics.findByMobile = async function (mobile) {
    return this.model('User').findOne({
        mobile
    })
}
module.exports = mongoose.model('users', userSchema)