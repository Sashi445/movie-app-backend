const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./data.sqlite",
});

sequelize.sync({}).then(() => {
  console.log("Database synced");
});

async function connectToDB() {
  try {
    await sequelize.authenticate();
    console.log("DB connected!");
  } catch (error) {
    console.error(error);
    return;
  }
}

module.exports = {
  sequelize,
  connectToDB,
};
