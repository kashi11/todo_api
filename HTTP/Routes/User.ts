import express from "express";
import UserService from "../../App/Application/User/UserService";
import Config from "../../App/InfraStructure/Config";
import AbstractUserRepositoryFactory from "../../App/InfraStructure/Repositories/AbstractRepositoryFactories/AbstractUserRepositoryFactory";
import UserController from "../Controllers/UserController";

require("dotenv").config();
const router = express.Router();

const userRepository = AbstractUserRepositoryFactory.createRepository(Config.Server.DB_DRIVER ?? "");
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post("/", userController.createUser);

export default router;
