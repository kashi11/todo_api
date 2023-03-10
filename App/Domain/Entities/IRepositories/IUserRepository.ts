import UserEntity from "../UserEntity/UserEntity";

export default interface IUserRepository {
  createUser(user: UserEntity): Promise<Boolean>;
  fetchByEmail(email: string): Promise<UserEntity>;
  userAlreadyExists(email: string): Promise<void>;
}
