import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import Config from "../Config";

export default new (class InfrastructureAuthService {
  signJwt = (userId: string): string => {
    return jwt.sign({ userId }, Config.Server.SECRET ?? "");
  };

  verifyJwt = async (token: string): Promise<any> => {
    return await jwt.verify(token, Config.Server.SECRET ?? "");
  };

  bycryptHash = async (originalString: string): Promise<string> => {
    return await bycrypt.hash(originalString, 10);
  };

  compareHash = async (hash: string, stringToCompare: string): Promise<boolean> => {
    return await bycrypt.compare(hash, stringToCompare);
  };
})();
