const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize = null;

if (process.env.ENV === "development") {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./data.sqlite",
  });
} else {
  sequelize = new Sequelize(process.env.DB_URL, {
    dialect: "postgres",
    dialectOptions: {
      ssl: true,
    },
  });
}

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
