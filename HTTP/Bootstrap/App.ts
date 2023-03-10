import express from "express";
import env from "dotenv";
import indexRouter from "../../HTTP/Routes";
import logger from "morgan";
import { ResponseInterceptor } from "../Middleware/Interceptor";
import("../../App/InfraStructure/Database/DatabaseConnection");

const app = express();

env.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use("/", indexRouter);
app.use(ResponseInterceptor.intercept)

export default app;
