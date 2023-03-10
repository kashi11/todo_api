import { OAuth2Client } from "google-auth-library";
import { google, oauth2_v2 } from "googleapis";
import GoogleAuthConfig from "../Config/GoogleAuthConfig";

export default class GoogleAuthService {
  static createConnection(): OAuth2Client {
    return new google.auth.OAuth2(
      GoogleAuthConfig.GoogleAuthClientId,
      GoogleAuthConfig.MyClientSecret,
      GoogleAuthConfig.RedirectUri
    );
  }

  static getconnectionUrl(auth: OAuth2Client): string {
    return auth.generateAuthUrl({
      access_type: "offline",
      prompt: "consent", // access type and approval prompt will force a new refresh token to be made each time signs in
      scope: GoogleAuthConfig.defaultScope,
    });
  }

  static getGoogleAuthUrl = (): string => {
    const auth = this.createConnection();
    return this.getconnectionUrl(auth);
  };

  static getGoogleAccountFromCode = async (code: string): Promise<oauth2_v2.Schema$Userinfo> => {
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
