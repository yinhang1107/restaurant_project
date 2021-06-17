import Joi from "joi";
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1000,
  },
  selectedFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const Post = mongoose.model("Post", postSchema);

export function validate(post) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(3).max(999),
    selectedFile: Joi.string(),
  });

  return schema.validate(post);
}
