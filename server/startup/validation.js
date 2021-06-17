import Joi from "joi";
import joi_objectId from "joi-objectid";

export default function () {
  Joi.objectId = joi_objectId(Joi);
}
