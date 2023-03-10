import { IUserEntity } from "./IUserEntity";

export default class UserEntity implements IUserEntity {
  email: string
  password: string
  name: string
  userId: string
  isGoogleUser: boolean

  constructor(
    email: string,
    password: string,
    name: string,
    userId: string,
    isGoogleUser: boolean
  ) {
    this.email = email;
    this.name = name;
    this.password = password;
    this.userId = userId;
    this.isGoogleUser = isGoogleUser;
  }

  static createFromInput(userObj: IUserEntity): UserEntity {
    const user = new UserEntity(
      userObj.email,
      userObj.password,
      userObj.name,
      userObj.userId,
      userObj.isGoogleUser
    );
    return user;
  }

  static createFromDatabase(userObj: IUserEntity): UserEntity {
    const user = new UserEntity(
      userObj.email,
      userObj.password,
      userObj.name,
      userObj.userId,
      userObj.isGoogleUser
    );
    return user;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  setUserId(userId: string): void {
    this.userId = userId;
  }
}
