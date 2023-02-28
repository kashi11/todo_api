import LoginDTO from "../../App/Application/Auth/LoginDTO";
import AuthService from "../../App/Application/Auth/AuthService";
import HttpResp from "../utils/HttpResponse";
import { Request, Response } from 'express';

class LoginController {
  constructor(private readonly authService: AuthService) { }

  login = async (req: Request, res: Response) => {
    const loginDTO = new LoginDTO(req);
    const httpResp = await this.authService.login(loginDTO);
    return HttpResp.convertToExpress(res, httpResp);
  };

  loginWithGoogle = async (_req: Request, res: Response) => {
    const httpResp = await this.authService.loginWithGoogle();
    return HttpResp.convertToExpress(res, httpResp);
  };
}

export default LoginController;
