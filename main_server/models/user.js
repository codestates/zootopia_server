'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      petName: {
        type: DataTypes.STRING,
        unique: true,
      },
      type: DataTypes.STRING,
      breed: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      // paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    },
  );
  return User;
};
