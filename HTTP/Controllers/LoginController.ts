import LoginDTO from "../../App/Application/Auth/LoginDTO";
import AuthService from "../../App/Application/Auth/AuthService";
import HttpResp from "../../App/Application/Utils/HttpResponse";

class LoginController {
  constructor(private readonly authService: AuthService) {}

  login = async (req: any, res: any) => {
    const loginDTO = new LoginDTO(req);
    const httpResp = await this.authService.login(loginDTO);
    return HttpResp.convertToExpress(res, httpResp);
  };

  loginWithGoogle = async (req: any, res: any) => {
    const httpResp = await this.authService.loginWithGoogle();
    return HttpResp.convertToExpress(res, httpResp);
  };
}

export default LoginController;
