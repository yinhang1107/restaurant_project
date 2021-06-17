import { Post, validate } from "../models/post.js";

export const getPosts = async (req, res) => {
  const { page } = req.query;

  const LIMIT = 2;
  const startIndex = (Number(page) - 1) * LIMIT;
  const total = await Post.countDocuments();
  const posts = await Post.find()
    .sort({ _id: -1 })
    .limit(LIMIT)
    .skip(startIndex);

  res.status(200).json({
    data: posts,
    currentPage: Number(page),
    numberOfPages: Math.ceil(total / LIMIT),
  });
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) return res.status(404).json("Cannot get post with this id.");

  res.status(200).json(post);
};

export const createPost = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const post = req.body;
  const newPost = new Post(post);

  await newPost.save();
  res.status(201).json(newPost);
};

export const updatePost = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const { id } = req.params;
  const post = req.body;

  const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
  if (!updatedPost)
    return res.status(404).json("Cannot find post with the given id.");

  res.status(200).json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  const deletedPost = await Post.findByIdAndDelete(id);
  if (!deletedPost)
    return res.status(404).json("Cannot find post with the given id.");
  res.status(200).json(deletedPost);
};
