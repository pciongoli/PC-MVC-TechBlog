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

// User - init method to initialize all of the model's data and configuration
User.init(
   {
      // define an id column
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },

      // define a user column
      username: {
         type: DataTypes.STRING,
         allowNull: false,
      },

      // define a password column
      password: {
         type: DataTypes.STRING,
         // this is the equivalent of SQL's `NOT NULL` option
         allowNull: false,
         validate: {
            len: [4],
         },
      },
   },
   // hooks
   {
      hooks: {
         // set up beforeCreate lifecycle - use async/await syntax
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

      // pass in our imported sequelize connection (the direct connection to our database)
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: "User",
   }
);
// export User
module.exports = User;
