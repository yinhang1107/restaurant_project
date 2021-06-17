import winston from "winston";
import "winston-mongodb";
import config from "config";

const transport1 = new winston.transports.File({
  filename: "uncaughtExpcetions.log",
});

const transport2 = new winston.transports.File({ filename: "logfile.log" });

const transport3 = new winston.transports.MongoDB({
  db: config.get("db"),
  level: "info",
});

export default function () {
  winston.exceptions.handle([transport1, transport2]);

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  winston.add(transport2);
  winston.add(transport3);
}
