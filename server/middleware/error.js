import winston from "winston";

export default function (err, req, res, next) {
  winston.error(err.message, { metadata: err });
   res.status(500).send("Something failed unexpectedly.");
}
