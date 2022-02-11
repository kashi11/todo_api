import UserEntity from "../../Domain/Entities/UserEntity/UserEntity";
import { generateId } from "../../InfraStructure/Utils/GenerateUuid";

class CreateUserDTO {
  public user: UserEntity;

  constructor(request: any) {
    const params = request.body;
    this.user = UserEntity.createFromInput(params);
    this.user.setUserId(generateId());
    if (!params.password) {
      this.user.setPassword(`${Math.random()}`);
    }
  }
}

export default CreateUserDTO;
