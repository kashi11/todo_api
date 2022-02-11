import env from "dotenv"
env.config();

export default {
    mySqlDB: process.env.mySqlDB || "",
    mySqlUser: process.env.mySqlUser || "",
    mySqlPassword: process.env.mySqlPassword || "",
    sequalizeHost: process.env.sequalizeHost || "",
}