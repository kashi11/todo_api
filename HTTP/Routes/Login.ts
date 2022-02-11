import express from "express";
import LoginController from "../Controllers/LoginController";
import AuthService from "../../App/Application/Auth/AuthService";
import Config from "../../App/InfraStructure/Config";
import AbstractUserRepositoryFactory from "../../App/InfraStructure/Repositories/AbstractRepositoryFactories/AbstractUserRepositoryFactory";

const userRepository = AbstractUserRepositoryFactory.createRepository(Config.Server.DB_DRIVER ?? "");
const authService = new AuthService(userRepository);
const loginController = new LoginController(authService);

const router = express.Router();

router.post("/loginWithGoogle", loginController.loginWithGoogle);
router.post("/", loginController.login);

export default router;
