import { google } from "googleapis";
import GoogleAuthConfig from "../Config/GoogleAuthConfig";

export default class GoogleAuthService {
  static createConnection() {
    return new google.auth.OAuth2(
      GoogleAuthConfig.GoogleAuthClientId,
      GoogleAuthConfig.MyClientSecret,
      GoogleAuthConfig.RedirectUri
    );
  }

  static getconnectionUrl(auth: any) {
    return auth.generateAuthUrl({
      access_type: "offline",
      prompt: "consent", // access type and approval prompt will force a new refresh token to be made each time signs in
      scope: GoogleAuthConfig.defaultScope,
    });
  }

  static getGoogleAuthUrl = (): string => {
    const auth = this.createConnection();
    const url = this.getconnectionUrl(auth);
    return url;
  };

  static getGoogleAccountFromCode = async (code: any): Promise<any> => {
    const auth = this.createConnection();
    const data = await auth.getToken(code);
    const tokens = data.tokens;
    auth.setCredentials(tokens);
    const { data: userData } = await google
      .oauth2({ version: "v2", auth })
      .userinfo.get();
    return userData;
  };
}
