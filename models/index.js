const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");
// define each of the relationships

// Post belongs to user
Post.belongsTo(User, {
   foreignKey: "userId",
   onDelete: "CASCADE",
});

// Comment belongs to user
Comment.belongsTo(User, {
   foreignKey: "userId",
   onDelete: "CASCADE",
});

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
