import express from "express";

import { Item, validate } from "../models/item.js";
import { Category } from "../models/category.js";
import { Type } from "../models/type.js";

const router = express.Router();

export const getItems = async (req, res) => {
  const items = await Item.find();
  res.json(items);
};

export const getItem = async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item)
    return res.status(404).send("The item with the given id is not found.");

  res.send(item);
};

export const createItem = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid category");

  const type = await Type.findById(req.body.typeId);
  if (!type) return res.status(400).send("Invalid type");

  const item = new Item({
    name: req.body.name,
    category: {
      _id: category._id,
      name: category.name,
    },
    type: type,
    price: req.body.price,
    priceHot: req.body.priceHot,
    priceCold: req.body.priceCold,
    selectedFile: req.body.selectedFile,
  });

  await item.save();

  res.send(item);
};

export const updateItem = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid category");

  const type = await Type.findById(req.body.typeId);
  if (!type) return res.status(400).send("Invalid type");

  const item = await Item.findById(req.params.id);
  if (!item)
    return res.status(404).send("The item with the given id is not found.");

  item.set({
    name: req.body.name,
    category: category,
    type: type,
    price: req.body.price,
    priceHot: req.body.priceHot,
    priceCold: req.body.priceCold,
    selectedFile: req.body.selectedFile,
  });

  await item.save();

  res.send(item);
};

export const deleteItem = async (req, res) => {
  const item = await Item.findByIdAndRemove(req.params.id);
  if (!item)
    return res.status(404).send("The item with the given id is not found.");

  res.send(item);
};

export default router;
