const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");
// create associations

// create association
User.hasMany(Post, {
   foreignKey: "user_id",
});

// reverse association by adding :
Post.belongsTo(User, {
   foreignKey: "userId",
   onDelete: "CASCADE",
});

// Comment belongs to user
Comment.belongsTo(User, {
   foreignKey: "userId",
   onDelete: "CASCADE",
});

// creating one to many relationship between these Comment and Post so we can perform aggregated SQL functions between Models
// Post has many Comments
Post.hasMany(Comment, {
   foreignKey: "postId",
   onDelete: "CASCADE",
});

// export
module.exports = {
   User,
   Comment,
   Post,
};
