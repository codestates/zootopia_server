'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, Comment, User }) {
      // Post:Comment 1:N Association
      Post.hasMany(Comment);
      Comment.belongsTo(Post, {
        foreignKey: 'postId',
      });

      // User:Comment 1:N Association
      User.hasMany(Comment);
      Comment.belongsTo(User, {
        foreignKey: 'userId',
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
    },
  );
  return Comment;
};
