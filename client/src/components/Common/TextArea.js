import React from "react";

const TextArea = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group my-3">
      <label htmlFor={name}>{label}</label>
      <textarea
        {...rest}
        name={name}
        id={name}
        className="form-control"
        style={{ height: "200px" }}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default TextArea;
