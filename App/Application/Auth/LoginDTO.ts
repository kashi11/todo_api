class LoginDTO {
  public email: string;
  public password: string;

  constructor(request: any) {
    const params = request.body;
    this.email = params.email;
    this.password = params.password;
  }
}

export default LoginDTO;
