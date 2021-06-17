import React, { useEffect, useState } from "react";
import Joi from "joi-browser";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";

import {
  getCategory,
  updateCategory,
  createCategory,
} from "../../actions/categories";
import {
  validate,
  validateProperty,
  renderInput,
  renderButton,
} from "../../services/formService";
import "./styles.css";

const CategoryForm = (props) => {
  const [category, setCategory] = useState({ name: "" });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Category"),
  };
  const { category: cat } = useSelector((state) => state.categories);

  useEffect(() => {
    const categoryId = props.match.params.id;
    if (categoryId === "new") return;

    dispatch(getCategory(categoryId));
  }, [dispatch, props.match.params.id]);

  useEffect(() => {
    if (cat) setCategory(mapToViewModel(cat));
  }, [cat]);

  const mapToViewModel = (category) => {
    return {
      _id: category?._id,
      name: category?.name,
    };
  };
  const handleChange = ({ currentTarget: input }) => {
    const err = { ...errors };
    const errorMessage = validateProperty(input, schema);
    if (errorMessage) err[input.name] = errorMessage;
    else delete err[input.name];

    const cat = { ...category };
    cat[input.name] = input.value;
    setCategory(cat);
    setErrors(err);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate(category, schema);
    setErrors(err || {});
    if (err) return;

    if (category._id) {
      const body = { ...category };
      delete body._id;
      dispatch(updateCategory(category._id, body));
    } else dispatch(createCategory(category));

    props.history.push("/menu");
  };
  return (
    <Container className="form">
      <h1 className="form__heading">Category</h1>
      <form onSubmit={handleSubmit}>
        {renderInput(category, errors, handleChange, "name", "Name")}
        {renderButton(category, schema, "Save")}
      </form>
    </Container>
  );
};

export default CategoryForm;
