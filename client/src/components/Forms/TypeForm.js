import React, { useEffect, useState } from "react";
import Joi from "joi-browser";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";

import { getType, updateType, createType } from "../../actions/types";
import {
  validate,
  validateProperty,
  renderInput,
  renderButton,
} from "../../services/formService";
import "./styles.css";

const TypeForm = (props) => {
  const [type, setType] = useState({ name: "" });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { type: typ } = useSelector((state) => state.types);
  const schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Type"),
  };

  useEffect(() => {
    const typeId = props.match.params.id;
    if (typeId === "new") return;

    dispatch(getType(typeId));
  }, [dispatch, props.match.params.id]);

  useEffect(() => {
    if (typ) setType(() => mapToViewModel(typ));
  }, [typ]);

  const mapToViewModel = (type) => {
    return {
      _id: type._id,
      name: type.name,
    };
  };
  const handleChange = ({ currentTarget: input }) => {
    const err = { ...errors };
    const errorMessage = validateProperty(input, schema);
    if (errorMessage) err[input.name] = errorMessage;
    else delete err[input.name];

    const typ = { ...type };
    typ[input.name] = input.value;
    setType(typ);
    setErrors(err);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate(type, schema);
    setErrors(err || {});
    if (err) return;

    if (type._id) {
      const body = { ...type };
      delete body._id;
      await dispatch(updateType(type._id, body));
    } else dispatch(createType(type));

    props.history.push("/menu");
  };
  return (
    <Container className="form">
      <h1 className="form__heading">Type</h1>
      <form onSubmit={handleSubmit}>
        {renderInput(type, errors, handleChange, "name", "Name")}
        {renderButton(type, schema, "Save")}
      </form>
    </Container>
  );
};

export default TypeForm;
