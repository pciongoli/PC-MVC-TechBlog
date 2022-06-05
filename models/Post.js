// Post model
const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Create Post model
class Post extends Model {}

// Post
Post.init(
   {
      title: DataTypes.STRING,
      body: DataTypes.STRING,
   },
   {
      sequelize,
   }
);

// export
module.exports = Post;
