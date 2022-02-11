import sequelizeDb from "./Sequelize/models";
import logger from "../Logger/Logger";
import mongoose from "mongoose";
import Config from "../Config";
import { DbDrivers } from "../Utils/Constants";
let connection;
const dbDriver = Config.Server.DB_DRIVER;
switch (dbDriver) {
  case DbDrivers.SEQUELIZE:
    connection = sequelizeDb;
    sequelizeDb.sequelize.sync().then(() => {
      logger.debug(`MySql database connected`);
    });
    break;
  case DbDrivers.MONGOOSE:
    mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/test", {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function () {
      logger.debug(`Mongo database connected`);
    });
    connection = db;
    break;
  default:
    throw new Error("Invalid db driver");
}

export default connection;
