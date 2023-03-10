import { IUserEntity } from "../../Domain/Entities/UserEntity/IUserEntity";
import UserEntity from "../../Domain/Entities/UserEntity/UserEntity";
import { generateId } from "../../InfraStructure/Utils/GenerateUuid";

class CreateUserDTO {
  public user: UserEntity;

  constructor(body: IUserEntity) {
    this.user = UserEntity.createFromInput(body);
  }

  static create(body: IUserEntity): CreateUserDTO {
    const userId = generateId();
    body.password = body.password || `${Math.random()}`
    return new CreateUserDTO({ ...body, userId })
  }
}

export default CreateUserDTO;
