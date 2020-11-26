'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Comment, Reply, User }) {
      // Comment:Reply 1:N Association
      Comment.hasMany(Reply);
      Reply.belongsTo(Comment, {
        foreignKey: 'commentId',
      });

      // User:Reply 1:N Association
      User.hasMany(Reply);
      Reply.belongsTo(User, {
        foreignKey: 'userId',
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
    },
  );
  return Reply;
};
