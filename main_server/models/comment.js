'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate({ Post, Comment, User }) {
      // Post:Comment 1:N Association
      Post.hasMany(Comment);
      Comment.belongsTo(Post, {
        foreignKey: 'postId',
        onDelete: 'CASCADE',
      });

      // User:Comment 1:N Association
      User.hasMany(Comment);
      Comment.belongsTo(User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    }
  }
  Comment.init(
    {
      text: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Comment',
      // paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    },
  );
  return Comment;
};
