'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Post }) {
      // User:Post 1:N Association
      User.hasMany(Post);
      Post.belongsTo(User, {
        foreignKey: 'userId',
      });
    }
  }
  Post.init(
    {
      thumbnail: DataTypes.STRING,
      picture_1: DataTypes.STRING,
      picture_2: DataTypes.STRING,
      picture_3: DataTypes.STRING,
      text: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Post',
      // paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    },
  );
  return Post;
};
