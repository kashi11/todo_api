import AuthService from "../../App/InfraStructure/Service/AuthService";
import HttpResp from "../utils/HttpResponse";
import HttpStatusCode from "../../App/Application/Utils/HttpStatusCode";
import CreateUserDTO from "../../App/Application/User/CreateUserDTO";
import UserService from "../../App/Application/User/UserService";
import AppError from "../../App/Application/Utils/AppError";
import Config from "../../App/InfraStructure/Config";
import AbstractUserRepositoryFactory from "../../App/InfraStructure/Repositories/AbstractRepositoryFactories/AbstractUserRepositoryFactory";
import GoogleAuthService from "../../App/InfraStructure/Service/GoogleAuthService";

export default async function (req: any, res: any, next: any) {
  const token = req.header("X-ACCESS-TOKEN");
  if (!token && !req.query.code) {
    const httpResp = HttpResp.create(HttpStatusCode.NOT_AUTHORIZED, {
      message: "Unauthorized",
    });
    return HttpResp.convertToExpress(res, httpResp);
  }
  // jwt Auth
  if (token) {
    try {
      const decodedToken = await AuthService.verifyJwt(token);
      const { userId } = decodedToken;
      req.user = { userId: userId };
      next();
    } catch (error: any) {
      const httpResp = HttpResp.create(HttpStatusCode.NOT_AUTHORIZED, {
        message: "Unauthorized",
      });
      return HttpResp.convertToExpress(res, httpResp);
    }
  }
  //Google Auth
  else if (req.query.code) {
    const { code } = req.query;
    try {
      const googleUser = await GoogleAuthService.getGoogleAccountFromCode(code);
      req.body = { ...googleUser, isGoogleUser: true };

      const createUserDTO = new CreateUserDTO(req);
      const userRepository = AbstractUserRepositoryFactory.createRepository(Config.Server.DB_DRIVER ?? "");
      const userService = new UserService(userRepository);
      const userExists = await userRepository.userAlreadyExists(createUserDTO.user.email);

      if (!userExists) {
        await userService.createUser(createUserDTO);
      }
      const { body } = await userService.getUserByEmail(createUserDTO.user.email);
      if (body.isGoogleUser) {
        const token = AuthService.signJwt(body.userId);
        return HttpResp.convertToExpress(res, HttpResp.create(200, { token }));
      } else {
        throw new AppError("Someone is already registered with your email", HttpStatusCode.ALREADY_EXISTS);
      }
    } catch (error: any) {
      return HttpResp.convertToExpress(res, HttpResp.create(error.status, error.message));
    }
  }
}
