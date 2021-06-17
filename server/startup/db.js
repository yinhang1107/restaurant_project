import mongoose from "mongoose";
import winston from "winston";
import config from "config";

export default function () {

  const CONNECTION_URL = config.get('db');
  mongoose
    .connect(CONNECTION_URL, {
      useNewUrlParser: true,
    })
    .then(() => winston.info("Connected to MongoDB..."))
    .then(() => console.log(`Connected to ${config.get("db")}`));

  mongoose.set("useFindAndModify", false);
  mongoose.set("useUnifiedTopology", true);
}
