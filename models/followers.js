const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Followers = sequelize.define(
  "followers",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    createdAt: "created_at",
  }
);

module.exports = Followers;
