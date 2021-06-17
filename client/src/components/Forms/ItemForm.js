import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";

import { getItem, updateItem, createItem } from "../../actions/items";
import { getCategories } from "../../actions/categories";
import { getTypes } from "../../actions/types";
import {
  validate,
  validateProperty,
  renderInput,
  renderButton,
  renderSelect,
} from "../../services/formService";

import "./styles.css";

const ItemForm = (props) => {
  const [item, setItem] = useState({
    name: "",
    categoryId: "",
    typeId: "",
    price: 0,
    priceHot: 0,
    priceCold: 0,
  });

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Name"),
    categoryId: Joi.string().required().label("Category"),
    typeId: Joi.string().label("Type"),
    price: Joi.number().min(0).max(100).label("Price"),
    priceHot: Joi.number().min(0).max(100).label("PriceHot"),
    priceCold: Joi.number().min(0).max(100).label("PriceCold"),
  };

  const { categories } = useSelector((state) => state.categories);
  const { types } = useSelector((state) => state.types);
  const { item: itm } = useSelector((state) => state.items);

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getCategories());

    const itemId = props.match.params.id;
    if (itemId === "new") return;

    dispatch(getItem(itemId));
  }, [dispatch, props.match.params.id]);

  useEffect(() => {
    if (itm) setItem(() => mapToViewModel(itm));
  }, [itm]);

  const mapToViewModel = (item) => {
    return {
      _id: item._id,
      name: item.name,
      categoryId: item.category._id,
      typeId: item.type._id,
      price: item.price,
      priceHot: item.priceHot,
      priceCold: item.priceCold,
    };
  };
  const handleChange = ({ currentTarget: input }) => {
    const err = { ...errors };
    const errorMessage = validateProperty(input, schema);
    if (errorMessage) err[input.name] = errorMessage;
    else delete err[input.name];

    const itm = { ...item };
    itm[input.name] = input.value;
    setItem(itm);
    setErrors(err);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate(item, schema);
    setErrors(err || {});
    if (err) return;

    if (item._id) {
      const body = { ...item };
      delete body._id;
      dispatch(updateItem(item._id, body));
    } else dispatch(createItem(item));

    props.history.push("/menu");
  };

  return (
    <Container className="form">
      <h1 className="form__heading">Item</h1>
      <form onSubmit={handleSubmit}>
        {renderInput(item, errors, handleChange, "name", "Name")}
        {renderSelect(
          item,
          errors,
          handleChange,
          "categoryId",
          "Category",
          categories
        )}
        {renderSelect(item, errors, handleChange, "typeId", "Type", types)}
        {renderInput(item, errors, handleChange, "price", "Price", "number")}
        {renderInput(
          item,
          errors,
          handleChange,
          "priceHot",
          "PriceHot",
          "number"
        )}
        {renderInput(
          item,
          errors,
          handleChange,
          "priceCold",
          "PriceCold",
          "number"
        )}
        {renderButton(item, schema, "Save")}
      </form>
    </Container>
  );
};

export default ItemForm;
