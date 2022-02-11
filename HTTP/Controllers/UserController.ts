import CreateUserDTO from "../../App/Application/User/CreateUserDTO";
import UserService from "../../App/Application/User/UserService";
import HttpResp from "../../App/Application/Utils/HttpResponse";

class UserController {
  constructor(private readonly userService: UserService) {}

  createUser = async (req: any, res: any) => {
    const createUserDTO = new CreateUserDTO(req);
    const httpResp = await this.userService.createUser(createUserDTO);
    return HttpResp.convertToExpress(res, httpResp);
  };
}

export default UserController;
