const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");
// create associations

// reverse association by adding
Post.belongsTo(User, {
   foreignKey: "userId",
   // when we delete a user we also delete the associated posts
   onDelete: "CASCADE",
});

// Comment belongs to user
Comment.belongsTo(User, {
   foreignKey: "userId",
   // when we delete a user we also delete the associated comments
   onDelete: "CASCADE",
});

// creating one to many relationship between these Comment and Post so we can perform aggregated SQL functions between Models
// Post has many Comments
Post.hasMany(Comment, {
   foreignKey: "postId",
   // when we delete a Post we also delete the associate
   onDelete: "CASCADE",
});

// export
module.exports = {
   User,
   Comment,
   Post,
};
