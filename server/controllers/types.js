import { Type, validate } from "../models/type.js";
import { Item } from "../models/item.js";

export const getTypes = async (req, res) => {
  const types = await Type.find();
  res.json(types);
};
export const getType = async (req, res) => {
  const type = await Type.findById(req.params.id);
  if (!type)
    return res.status(404).json("Type with the given id is not found.");

  res.json(type);
};

export const createType = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const type = new Type({
    name: req.body.name,
  });

  await type.save();

  res.json(type);
};

export const updateType = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const type = await Type.findById(req.params.id);
  if (!type) return res.status(404).send("Invalid type");

  const oldType = { ...type._doc };
  type.set({
    name: req.body.name,
  });

  await type.save();

  await Item.updateMany({ type: oldType }, { type });

  res.json(type);
};

export const deleteType = async (req, res) => {
  const type = await Type.findByIdAndRemove(req.params.id);
  if (!type)
    return res.status(404).send("Type with the given id is not found.");

  await Item.deleteMany({ type });
  res.json(type);
};
