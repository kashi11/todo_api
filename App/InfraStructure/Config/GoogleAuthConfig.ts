import env from "dotenv"
env.config();

export default {
    GoogleAuthClientId: process.env.GoogleAuthClientId,
    MyClientSecret: process.env.MyClientSecret,
    RedirectUri: process.env.FRONTEND_URL,
    defaultScope : [
        'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/userinfo.email',
    ]
}