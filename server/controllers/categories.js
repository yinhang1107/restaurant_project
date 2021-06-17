import { Category, validate } from "../models/category.js";
import { Item } from "../models/item.js";

export const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};
export const getCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category)
    return res.status(404).json("Category with the given id is not found.");

  res.json(category);
};

export const createCategory = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = new Category({
    name: req.body.name,
  });

  await category.save();

  res.json(category);
};

export const updateCategory = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).send("Invalid category");

  const oldCategory = { ...category._doc };
  category.set({
    name: req.body.name,
  });

  await category.save();

  await Item.updateMany({ category: oldCategory }, { category });

  res.json(category);
};

export const deleteCategory = async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);
  if (!category)
    return res.status(404).send("Category with the given id is not found.");

  await Item.deleteMany({ category });
  res.json(category);
};
