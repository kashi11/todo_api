import LoginDTO from "./LoginDTO";
import GoogleAuthService from "../../InfraStructure/Service/GoogleAuthService";
import InfrastructureAuthService from "../../InfraStructure/Service/AuthService";
import IUserRepository from "../../Domain/Entities/UserEntity/IUserRepository";
import HttpResp from "../Utils/HttpResponse";
import AppError from "../Utils/AppError";
import HttpStatusCode from "../Utils/HttpStatusCode";
export default class AuthService {
  constructor(private readonly userRepository: IUserRepository) {}

  async login(loginDTO: LoginDTO): Promise<HttpResp> {
    const { email, password } = loginDTO;
    try {
      const user = await this.userRepository.fetchByEmail(email);
      if (!user) {
        throw new AppError("x User not found!", HttpStatusCode.NOT_FOUND);
      }
      const matchedPassword = await InfrastructureAuthService.compareHash(password, user.password);
      if (!matchedPassword) {
        throw new AppError("x Wrong password!", HttpStatusCode.NOT_FOUND);
      }
      const token = InfrastructureAuthService.signJwt(user.userId);
      return HttpResp.create(HttpStatusCode.OK, { token });
    } catch (error: any) {
      console.log(error);

      return HttpResp.create(error.status, { status: "error", message: error.message });
    }
  }

  async loginWithGoogle(): Promise<HttpResp> {
    try {
      const url = GoogleAuthService.getGoogleAuthUrl();
      return HttpResp.create(HttpStatusCode.OK, { url });
    } catch (error: any) {
      return HttpResp.create(HttpStatusCode.ERROR, { status: "error", message: error.message });
    }
  }
}
