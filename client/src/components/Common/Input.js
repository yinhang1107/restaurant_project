import React from "react";
// import Form from "react-bootstrap/Form";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group my-3">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        name={name}
        id={name}
        step="0.1"
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
