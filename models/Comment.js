// Comment model
const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Create Comment model
class Comment extends Model {}

// Comment
Comment.init(
   {
      body: {
         type: DataTypes.STRING,
         allowNull: false,
      },
   },
   {
      sequelize,
   }
);

// export
module.exports = Comment;
