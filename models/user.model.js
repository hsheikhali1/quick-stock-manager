const { Model, DataTypes } = require("sequelize");
const { db, sequelize } = require("./index");

const bcrypt = require("bcrypt");

class User extends Model {}

const modelData = {
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
};

User.init(modelData, {
  hooks: {
    beforeCreate: async (newUserData) => {
      newUserData.password = await bcrypt.hash(newUserData.password, 10);

      return newUserData;
    },
    beforeUpdate: async (updatedUserData) => {
      updatedUserData.password = await bcrypt.hash(
        updatedUserData.password,
        10
      );

      return updatedUserData;
    },
  },
  sequelize: sequelize,
  timestamps: false,
  freezeTableName: false,
  underscored: true,
  modelName: "User"
});


module.exports = User;