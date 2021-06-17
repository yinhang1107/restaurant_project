import Joi from "joi";
import mongoose from "mongoose";
import config from "config";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email, isAdmin: this.isAdmin },
    process.env.jwt_privateKey
  );
  return token;
};
export const User = mongoose.model("User", userSchema);

export function validate(user) {
  const schema = Joi.object({
    email: Joi.string().email().min(5).max(50),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(user);
}
