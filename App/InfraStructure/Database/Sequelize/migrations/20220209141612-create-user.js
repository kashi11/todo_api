'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      todo: DataTypes.STRING,
      todoId: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
      isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
      userId: { type: DataTypes.STRING, allowNull: false },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};