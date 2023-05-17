const { DataTypes } = require("sequelize");
const { sequelize } = require("./../db");

const Recommendations = sequelize.define("recommendations", {
    // sent by me
    userA: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // recieved by me
    userB: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
});

module.exports = Recommendations;
