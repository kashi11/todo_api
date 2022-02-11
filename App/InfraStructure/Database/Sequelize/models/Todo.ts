"use strict";
import { Model } from "sequelize";

module.exports = (sequelize: any, DataTypes: any) => {
  class Todo extends Model {
    static associate(models: any) {
      Todo.belongsTo(models.User, { foreignKey: { name: "userId", allowNull: false } });
    }
  }
  Todo.init(
    {
      todo: DataTypes.STRING,
      todoId: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
      isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
