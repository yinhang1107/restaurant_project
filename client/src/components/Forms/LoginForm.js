import React, { useState } from "react";
import Joi from "joi-browser";
import Container from "react-bootstrap/Container";
import { useDispatch } from "react-redux";

import { login } from "../../actions/user";
import {
  validate,
  validateProperty,
  renderInput,
  renderButton,
} from "../../services/formService";
import "./styles.css";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };
  const dispatch = useDispatch();

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
      dispatch(login(data));
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const err = { ...errors };
        err.username = ex.response.data;
        setErrors(err);
      }
    }
  };
  return (
    <Container className="form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: "65%" }}>
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
        {renderButton(data, schema, "Login")}
      </form>
    </Container>
  );
};

export default Login;
