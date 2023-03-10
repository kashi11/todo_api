import jwt, { JwtPayload } from "jsonwebtoken";
import bycrypt from "bcrypt";
import Config from "../Config";

interface AuthPayload extends JwtPayload {
  userId: string
}

class InfrastructureAuthService {
  signJwt = (userId: string): string => {
    return jwt.sign({ userId }, Config.Server.SECRET ?? "");
  };

  verifyJwt = (token: string): AuthPayload => {
    return jwt.verify(token, Config.Server.SECRET ?? "") as AuthPayload;
  };

  bycryptHash = async (originalString: string): Promise<string> => {
    return await bycrypt.hash(originalString, 10);
  };

  compareHash = async (hash: string, stringToCompare: string): Promise<boolean> => {
    return await bycrypt.compare(hash, stringToCompare);
  };
}

const infrastructureAuthService = new InfrastructureAuthService()

export default infrastructureAuthService;
