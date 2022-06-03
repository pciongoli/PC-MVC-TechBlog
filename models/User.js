// User Model
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/config");

// Create User Model
class User extends Model {
   // set up method to run on instance data (per user) to check password
   checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
   }
}

// User
User.init(
   {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },
      username: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            len: [4],
         },
      },
   },
   // hooks
   {
      hooks: {
         // set up beforeCreate lifecycle
         async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
         },
         //  set up beforeUpdate lifecycle
         async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrypt.hash(
               updatedUserData.password,
               10
            );
            return updatedUserData;
         },
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: "User",
   }
);
// export User
module.exports = User;
