'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_like_post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Post, User_like_post }) {
      User.belongsToMany(Post, {
        through: User_like_post,
        foreignKey: 'userId',
        otherKey: 'postId',
      });

      Post.belongsToMany(User, {
        through: User_like_post,
        foreignKey: 'postId',
        otherKey: 'userId',
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
