import Joi from "joi";
import mongoose from "mongoose";

import { categorySchema } from "./category.js";
import { typeSchema } from "./type.js";

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  category: {
    type: categorySchema,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    max: 999,
  },
  priceHot: {
    type: Number,
    min: 0,
    max: 999,
  },
  priceCold: {
    type: Number,
    min: 0,
    max: 999,
  },
  type: {
    type: typeSchema,
    required: true,
  },
});

export const Item = mongoose.model("Item", itemSchema);

export function validate(item) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    categoryId: Joi.objectId().required(),
    typeId: Joi.objectId().required(),
    price: Joi.number().min(0).max(999),
    priceHot: Joi.number().min(0).max(999),
    priceCold: Joi.number().min(0).max(999),
    selectedFile: Joi.string(),
  });

  return schema.validate(item);
}
