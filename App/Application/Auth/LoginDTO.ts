import { Request } from "express";
class LoginDTO {
  public email: string;
  public password: string;

  constructor(request: Request) {
    const params = request.body;
    this.email = params.email;
    this.password = params.password;
  }
}

export default LoginDTO;
