import AuthService from "../../App/InfraStructure/Service/AuthService";
import CreateUserDTO from "../../App/Application/User/CreateUserDTO";
import UserService from "../../App/Application/User/UserService";
import Config from "../../App/InfraStructure/Config";
import AbstractUserRepositoryFactory from "../../App/InfraStructure/Repositories/AbstractRepositoryFactories/AbstractUserRepositoryFactory";
import GoogleAuthService from "../../App/InfraStructure/Service/GoogleAuthService";
import { AlreadyExistsError, UnAutherizedOperationError } from "../../App/Domain/Exception";
import { NextFunction, Response } from "express";
import { AuthRequest, LoginResponse } from "../utils/AuthTypes";
import AppResult from "../../App/Application/Utils/AppResult";

export default async function (req: AuthRequest, res: Response, next: NextFunction): Promise<AppResult<LoginResponse> | void> {
  const token = req.header("X-ACCESS-TOKEN");
  if (!token && !req.query.code) {
    throw new UnAutherizedOperationError('unauthorized action')
  }
  // jwt Auth
  if (token) {
    const decodedToken = AuthService.verifyJwt(token);
    const userId = decodedToken?.userId;
    if (!userId)
      throw new UnAutherizedOperationError('unauthorized action');
    req.user = { userId: userId };
    next();
  }
  //Google Auth
  else if (req.query.code) {
    const { code } = req.query;
    const googleUser = await GoogleAuthService.getGoogleAccountFromCode(code);
    req.body = { ...googleUser, isGoogleUser: true };
    const createUserDTO = CreateUserDTO.create(req.body);
    const userRepository = AbstractUserRepositoryFactory.createRepository(Config.Server.DB_DRIVER);
    const userService = new UserService(userRepository);
    const user = await userRepository.fetchByEmail(createUserDTO.user.email);
    if (!user) {
      await userService.createUser(createUserDTO);
    }
    const { result: userResult } = await userService.getUserByEmail(createUserDTO.user.email);
    if (!userResult.isGoogleUser) {
      throw new AlreadyExistsError('Someone already registered with your email');
    }
    const token = AuthService.signJwt(userResult.userId);
    return AppResult.success<LoginResponse>({ token })
  }
}
