import React, { useState } from "react";
import Joi from "joi-browser";
import Container from "react-bootstrap/Container";
import { useDispatch } from "react-redux";

import { register } from "../../actions/user";

import {
  validate,
  validateProperty,
  renderInput,
  renderButton,
} from "../../services/formService";

const Register = (props) => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  const handleChange = ({ currentTarget: input }) => {
    const err = { ...errors };
    const errorMessage = validateProperty(input, schema);
    if (errorMessage) err[input.name] = errorMessage;
    else delete err[input.name];

    const dat = { ...data };
    dat[input.name] = input.value;
    setData(dat);
    setErrors(err);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate(data, schema);
    setErrors(err || {});
    if (err) return;

    try {
      dispatch(register(data, props.history));
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const err = { ...errors };
        err.username = ex.response.data;
        setErrors({ errors: err });
      }
    }
  };

  return (
    <Container className="form">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        {renderInput(
          data,
          errors,
          handleChange,
          "username",
          "Username",
          "email"
        )}
        {renderInput(
          data,
          errors,
          handleChange,
          "password",
          "Password",
          "password"
        )}
        {renderButton(data, schema, "Register")}
      </form>
    </Container>
  );
};

export default Register;
