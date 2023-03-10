import env from "dotenv";
env.config();

export default {
  DB_DRIVER: process.env.DRIVER || '',
  APP_NAME: process.env.APP_NAME,
  SECRET: process.env.SECRET,
  APP_PORT: process.env.APP_PORT,
};
