const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const EarlyAccessMembers = sequelize.define(
  "earlyaccessmembers",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    device: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    willRecommend: {
      type: DataTypes.BOOLEAN,
      defaultValue: "false",
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "NONE",
    },
  },
  {
    createdAt: "signedOn",
  }
);

module.exports = EarlyAccessMembers;
