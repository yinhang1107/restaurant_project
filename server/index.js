import express from "express";
import winston from "winston";

import config from "./startup/config.js";
import db from "./startup/db.js";
import routes from "./startup/routes.js";
import logging from "./startup/logging.js";
import validation from "./startup/validation.js";

const app = express();

logging();
routes(app);
db();
config();
validation();

app.get('/', (req,res) => {
  res.send('Hello to Restaurant API.')
})


const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
     winston.info(`Listening on port ${port}`);
      console.log(`Listening on port ${port}`);
  });

export default server;

