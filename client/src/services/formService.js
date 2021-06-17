import Joi from "joi-browser";
import FileBase from "react-file-base64";

import Input from "../components/Common/Input";
import Select from "../components/Common/Select";
import TextArea from "../components/Common/TextArea";

export const validateProperty = ({ name, value }, schema) => {
  const obj = { [name]: value };
  const joiSchema = { [name]: schema[name] };

  const { error } = Joi.validate(obj, joiSchema);

  return error ? error.details[0].message : null;
};

export const validate = (data, schema) => {
  const option = { abortEarly: false };
  const { error } = Joi.validate(data, schema, option);
  const errors = {};
  if (!error) return null;

  for (let item of error.details) errors[item.path[0]] = item.message;

  return errors;
};

export const renderButton = (data, schema, label) => {
  return (
    <button disabled={validate(data, schema)} className="btn btn-primary my-3">
      {label}
    </button>
  );
};

export const renderSelect = (
  data,
  errors,
  handleChange,
  name,
  label,
  options
) => {
  return (
    <Select
      name={name}
      value={data[name]}
      label={label}
      options={options}
      onChange={handleChange}
      error={errors[name]}
    />
  );
};

export const renderInput = (
  data,
  errors,
  handleChange,
  name,
  label,
  type = "text"
) => {
  return (
    <Input
      type={type}
      label={label}
      name={name}
      onChange={handleChange}
      value={data[name]}
      error={errors[name]}
    />
  );
};

export const renderFileInput = (data, setData) => {
  return (
    <div className="mt-3">
      <FileBase
        type="file"
        multiple={false}
        onDone={({ base64 }) => {
          setData({ ...data, selectedFile: base64 });
        }}
      />
    </div>
  );
};

export const renderTextArea = (
  data,
  errors,
  handleChange,
  name,
  label,
  type = "text"
) => {
  return (
    <TextArea
      type={type}
      label={label}
      name={name}
      onChange={handleChange}
      value={data[name]}
      error={errors[name]}
    />
  );
};
