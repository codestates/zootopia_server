'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_like_post extends Model {
    static associate({ User, Post, User_like_post }) {
      User.belongsToMany(Post, {
        through: User_like_post,
        foreignKey: 'userId',
        otherKey: 'postId',
        onDelete: 'CASCADE',
      });

      Post.belongsToMany(User, {
        through: User_like_post,
        foreignKey: 'postId',
        otherKey: 'userId',
        onDelete: 'CASCADE',
      });
    }
  }
  User_like_post.init(
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User_like_post',
    },
  );
  return User_like_post;
};
