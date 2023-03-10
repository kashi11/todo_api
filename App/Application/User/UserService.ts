import CreateUserDTO from "./CreateUserDTO";
import IUserRepository from "../../Domain/Entities/IRepositories/IUserRepository";
import AuthService from "../../InfraStructure/Service/AuthService";
import AppResult from "../Utils/AppResult";
import { IUserEntity } from "../../Domain/Entities/UserEntity/IUserEntity";

type SuccessfulCreation = {
  message: string
}

export default class UserService {
  constructor(private readonly userRepository: IUserRepository) { }

  async createUser(createUserDTO: CreateUserDTO): Promise<AppResult<SuccessfulCreation>> {
    const userEntity = createUserDTO.user;
    await this.userRepository.userAlreadyExists(userEntity.email);
    const hash = await AuthService.bycryptHash(userEntity.password);
    userEntity.setPassword(hash);
    await this.userRepository.createUser(userEntity);
    return AppResult.success<SuccessfulCreation>({ message: 'User Created' })
  }

  async getUserByEmail(email: string): Promise<AppResult<IUserEntity>> {
    const user = await this.userRepository.fetchByEmail(email);
    return AppResult.success<IUserEntity>(user);
  }
}
