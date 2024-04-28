import AuthService from "../services/Auth.js";
import ErrorsUtils from "../utils/Errors.js";
import {COOKIE_SETTINGS} from "../constants.js";
import {v4 as uuidv4} from 'uuid';

class AuthController {
    static async signIn(req, res) {
        const {email, password} = req.body;
        const {fingerprint} = req;

        try {
            const {user, accessToken, refreshToken, accessTokenExpiration} = await AuthService.signIn({
                email,
                password,
                fingerprint,
            })

            res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)

            return res.status(200).json({user, accessToken, accessTokenExpiration});
        } catch (err) {
            return ErrorsUtils.catchError(res, err);
        }
    }

    static async signUp(req, res) {
        const {email, password, firstName, lastName} = req.body;
        const {fingerprint} = req;
        try {
            const {accessToken, refreshToken, accessTokenExpiration} = await AuthService.signUp({
                email,
                password,
                firstName,
                lastName,
                fingerprint,
            })

            res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)

            return res.status(200).json({accessToken, accessTokenExpiration});
        } catch (err) {
            return ErrorsUtils.catchError(res, err);
        }
    }

    static async logOut(req, res) {
        const refreshToken = req.cookies.refreshToken;
        const {fingerprint} = req;
        try {
            await AuthService.logOut(refreshToken);

            res.clearCookie("refreshToken");

            return res.sendStatus(200);
        } catch (err) {
            return ErrorsUtils.catchError(res, err);
        }
    }

    static async refresh(req, res) {

        const {fingerprint} = req;
        const currentRefreshToken = req.cookies.refreshToken;

        try {
            const {user, accessToken, refreshToken, accessTokenExpiration} = await AuthService.refresh({
                currentRefreshToken,
                fingerprint,
            });

            res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN);

            return res.status(200).json({user, accessToken, accessTokenExpiration});
        } catch (err) {
            return ErrorsUtils.catchError(res, err);
        }
    }
}

export default AuthController;
