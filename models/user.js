const { DataTypes } = require("sequelize");
const { sequelize } = require("./../db");
const Followers = require("./followers");
const Recommendations = require("./recommendations");
const Playlists = require("./playlists");

const Users = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "GOOGLE",
    },
    fuid: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    createdAt: "joinedAt",
  }
);

Users.belongsToMany(Users, {
  through: Followers,
  foreignKey: "followerId",
  as: "follower",
});
Users.belongsToMany(Users, {
  through: Followers,
  foreignKey: "followingId",
  as: "following",
});

Users.belongsToMany(Users, {
  through: Recommendations,
  foreignKey: "userA",
  as: "from",
});
Users.belongsToMany(Users, {
  through: Recommendations,
  foreignKey: "userB",
  as: "to",
});

Users.hasMany(Playlists, {});
Playlists.belongsTo(Users);

module.exports = Users;
