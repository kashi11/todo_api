export default class UserEntity {
  public email: string;
  public password: string;
  public name: string;
  public userId: string;
  public isGoogleUser: boolean;

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

  static createFromInput(userObj: any): UserEntity {
    const user = new UserEntity(
      userObj.email,
      userObj.password,
      userObj.name,
      userObj.userId,
      userObj.isGoogleUser
    );
    return user;
  }

  static createFromDatabase(userObj: any): UserEntity {
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
