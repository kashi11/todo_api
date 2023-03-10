import LoginDTO from "./LoginDTO";
import GoogleAuthService from "../../InfraStructure/Service/GoogleAuthService";
import InfrastructureAuthService from "../../InfraStructure/Service/AuthService";
import IUserRepository from "../../Domain/Entities/IRepositories/IUserRepository";
import HttpResp from "../../../HTTP/utils/HttpResponse";
import AppError from "../Utils/AppError";
import HttpStatusCode from "../Utils/ResponseStatus";

type TLoginWithPassword = {
  token: string
}

type TLoginWithGoogle = {
  url: string
}

export default class AuthService {
  constructor(private readonly userRepository: IUserRepository) { }

  async login(loginDTO: LoginDTO): Promise<HttpResp<TLoginWithPassword>> {
    const { email, password } = loginDTO;
    const user = await this.userRepository.fetchByEmail(email);
    if (!user) {
      throw new AppError("x User not found!", HttpStatusCode.NOT_FOUND);
    }
    const matchedPassword = await InfrastructureAuthService.compareHash(password, user.password);
    if (!matchedPassword) {
      throw new AppError("x Wrong password!", HttpStatusCode.NOT_FOUND);
    }
    const token = InfrastructureAuthService.signJwt(user.userId);
    return HttpResp.create<TLoginWithPassword>(HttpStatusCode.OK, { token });
  }

  async loginWithGoogle(): Promise<HttpResp<TLoginWithGoogle>> {
    const url = GoogleAuthService.getGoogleAuthUrl();
    return HttpResp.create<TLoginWithGoogle>(HttpStatusCode.OK, { url });
  }
}
