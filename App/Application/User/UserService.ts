import CreateUserDTO from "./CreateUserDTO";
import IUserRepository from "../../Domain/Entities/UserEntity/IUserRepository";
import AuthService from "../../InfraStructure/Service/AuthService";
import AppError from "../Utils/AppError";
import HttpResp from "../Utils/HttpResponse";
import HttpStatusCode from "../Utils/HttpStatusCode";

export default class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<HttpResp> {
    const userEntity = createUserDTO.user;
    try {
      const user = await this.userRepository.userAlreadyExists(userEntity.email);
      if (user) {
        throw new AppError({ message: "x User already exists!" }, HttpStatusCode.ALREADY_EXISTS);
      }
      const hash = await AuthService.bycryptHash(userEntity.password);
      userEntity.setPassword(hash);
      const createdUser = await this.userRepository.createUser(userEntity);
      return HttpResp.create(HttpStatusCode.OK, {
        message: "User created Successfully",
      });
    } catch (error: any) {
      return HttpResp.create(HttpStatusCode.ERROR, error.message);
    }
  }

  async getUserByEmail(email: string): Promise<HttpResp> {
    try {
      const user = await this.userRepository.fetchByEmail(email);
      return HttpResp.create(HttpStatusCode.OK, user);
    } catch (error: any) {
      return HttpResp.create(HttpStatusCode.ERROR, error.message);
    }
  }
}
