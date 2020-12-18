'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reply extends Model {
    static associate({ Comment, Reply, User }) {
      // Comment:Reply 1:N Association
      Comment.hasMany(Reply);
      Reply.belongsTo(Comment, {
        foreignKey: 'commentId',
        onDelete: 'CASCADE',
      });

      // User:Reply 1:N Association
      User.hasMany(Reply);
      Reply.belongsTo(User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    }
  }
  Reply.init(
    {
      text: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      commentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Reply',
      // paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    },
  );
  return Reply;
};
