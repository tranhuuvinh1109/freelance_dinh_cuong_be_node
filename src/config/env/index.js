require("dotenv").config();

const CONFIG = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_LIFE: process.env.ACCESS_TOKEN_LIFE,
  REFRESH_TOKEN_LIFE: process.env.REFRESH_TOKEN_LIFE,
};

module.exports = CONFIG;
