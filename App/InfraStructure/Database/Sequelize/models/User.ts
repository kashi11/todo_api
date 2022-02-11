"use strict";
import { Model } from "sequelize";
module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model {
    static associate(models: any) {
      User.hasMany(models.Todo, { foreignKey: { name: "userId", allowNull: false } });
    }
  }
  
  User.init(
    {
      userId: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
      name: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      isGoogleUser: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
