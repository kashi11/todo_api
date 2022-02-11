'use strict';

import {Sequelize, DataTypes} from "sequelize";
import Config from "../../../Config";
import fs from "fs";
import path from "path";
const basename = path.basename(__filename);
const sequelizeDb: any = {};

const { MySqlConfig } = Config;
const {mySqlDB, mySqlPassword, mySqlUser, sequalizeHost} = MySqlConfig;


const sequelize = new Sequelize(mySqlDB, mySqlUser, mySqlPassword, {
  host: sequalizeHost,
  dialect: "mysql",
  pool: {
    max: 400,
    min: 1,
  },
});

fs
  .readdirSync(__dirname)
  .filter((file: string) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts' || file.slice(-3) === '.js');
  })
  .forEach((file: any) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    sequelizeDb[model.name] = model;
  });

Object.keys(sequelizeDb).forEach((modelName: string) => {
  if (sequelizeDb[modelName].associate) {
    sequelizeDb[modelName].associate(sequelizeDb);
  }
});


sequelizeDb.sequelize = sequelize;
sequelizeDb.Sequelize = Sequelize;

export default sequelizeDb;
