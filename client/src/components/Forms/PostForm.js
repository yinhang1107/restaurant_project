import React, { useEffect, useState } from "react";
import Joi from "joi-browser";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";

import { updatePost, createPost } from "../../actions/posts";
import {
  validate,
  validateProperty,
  renderInput,
  renderButton,
  renderFileInput,
  renderTextArea,
} from "../../services/formService";

const PostForm = (props) => {
  const [post, setPost] = useState({
    title: "",
    description: "",
    selectedFile: "",
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    description: Joi.string().required().label("Description"),
    selectedFile: Joi.string(),
  };

  useEffect(() => {
    async function populatePost() {
      const postId = props.match.params.id;
      if (postId === "new") return;

      const post = posts.find((p) => p._id === postId);
      const model = mapToViewModel(post);
      setPost(model);
    }
    populatePost();
  }, [posts, props.match.params.id]);

  const mapToViewModel = (post) => {
    return {
      _id: post._id,
      title: post.title,
      description: post.description,
      selectedFile: post.selectedFile,
    };
  };
  const handleChange = ({ currentTarget: input }) => {
    const err = { ...errors };
    const errorMessage = validateProperty(input, schema);
    if (errorMessage) err[input.name] = errorMessage;
    else delete err[input.name];

    const pt = { ...post };
    pt[input.name] = input.value;
    setPost(pt);
    setErrors(err);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate(post, schema);
    setErrors(err || {});
    if (err) return;

    if (post._id) {
      const body = { ...post };
      delete body._id;
      dispatch(updatePost(post._id, body));
    } else dispatch(createPost(post));

    props.history.push("/news");
  };
  return (
    <Container className="form">
      <h1 className="form__heading">Post</h1>
      <form onSubmit={handleSubmit}>
        {renderInput(post, errors, handleChange, "title", "Title")}
        {renderTextArea(
          post,
          errors,
          handleChange,
          "description",
          "Description"
        )}
        {renderFileInput(post, setPost)}
        {renderButton(post, schema, "Save")}
      </form>
    </Container>
  );
};

export default PostForm;
