import Joi from "joi";
import mongoose from "mongoose";

export const typeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

export const Type = mongoose.model("Type", typeSchema);

export function validate(type) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50),
  });

  return schema.validate(type);
}
