const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const saltingRounds = 10;
const bcrypt = require("bcryptjs");
const userSchema = new Schema({
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  salt: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin"],
    default: "admin",
  },
  cart: [
    {
      product_id: {
        type: mongoose.Types.ObjectId,
        ref: "products",
      },
      quantity: {
        type: Number,
      },
    },
  ],
  created_on: {
    type: Date,
    default: Date.now(),
  },
  is_active: {
    type: Boolean,
    default: true,
  },
});
// encrypt password before save
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified) {
    // don't rehash if it's an old user
    next();
  } else {
    let hashedPassword = this.hashPassword(user.password);
    user.password = hashedPassword;
    next();
  }
});
userSchema.methods.hashPassword = function (password) {
  let user = this;
  if (password) {
    let hashedPassword = bcrypt.hashSync(password, saltingRounds);
    return hashedPassword;
  } else {
    return password;
  }
};
userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model("users", userSchema);
