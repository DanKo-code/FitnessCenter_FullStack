import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import TokenService from "./Token.js";
import {NotFound, Forbidden, Conflict, Unauthorized} from "../utils/Errors.js";
import RefreshSessionsRepository from "../repositories/RefreshSession.js";
import UserRepository from "../repositories/User.js";
import {ACCESS_TOKEN_EXPIRATION} from "../constants.js";
import {v4 as uuidv4} from "uuid";

class AuthService {
    static async signIn({email, password, fingerprint}) {
        const user = await UserRepository.getUserData(email);


        if (!user) {
            throw new Conflict('User not found');
        }

        //const passwordMatch = await bcrypt.compare(password, user.Password);
        const passwordMatch = password === user.Password;

        if (!passwordMatch) {
            throw new Unauthorized('Invalid email or password');
        }

        const payload = {id: user.Id, email: user.Email, password: user.Password}

        const accessToken = await TokenService.generateAccessToken(payload)
        const refreshToken = await TokenService.generateRefreshToken(payload)

        const refreshSessionId = uuidv4();
        await RefreshSessionsRepository.createRefreshSession({
            refreshSessionId,
            clientId: user.Id,
            refreshToken,
            fingerprint
        });

        return {
            user,
            accessToken,
            refreshToken,
            accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
        }
    }

    static async signUp({email, password, firstName, lastName, fingerprint}) {
        const user = await UserRepository.getUserData(email);

        if (user) {
            throw new Conflict('Email already exists');
        }

        const clientId = uuidv4();
        //const hashedPassword = await bcrypt.hash(password, 10); // Хэширование пароля с силой хеширования 10
        const hashedPassword = password;

        const role = 1;
        const client = await UserRepository.createUser({clientId, firstName, lastName, email, hashedPassword, role});

        const payload = {clientId, email, password}

        const accessToken = await TokenService.generateAccessToken(payload)
        const refreshToken = await TokenService.generateRefreshToken(payload)

        const refreshSessionId = uuidv4();
        await RefreshSessionsRepository.createRefreshSession({
            refreshSessionId,
            clientId,
            refreshToken,
            fingerprint
        });

        return {
            accessToken,
            refreshToken,
            accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
        }
    }

    static async logOut(refreshToken) {
        await RefreshSessionsRepository.deleteRefreshSession(refreshToken);
    }

    static async refresh({fingerprint, currentRefreshToken}) {
        if (!currentRefreshToken) {
            throw new Unauthorized();
        }

        const refreshSession = await RefreshSessionsRepository.getRefreshSession(
            currentRefreshToken
        );

        if (!refreshSession) {
            throw new Unauthorized();
        }

        if (refreshSession.finger_print !== fingerprint.hash) {
            throw new Forbidden();
        }

        await RefreshSessionsRepository.deleteRefreshSession(currentRefreshToken);

        let payload;
        try {
            payload = await TokenService.verifyRefreshToken(currentRefreshToken);

        } catch (error) {
            throw new Forbidden(error);
        }

        //not need
        const {Id, Email, Password} = await UserRepository.getUserData(payload.email);
        const user = await UserRepository.getUserData(payload.email);

        const actualPayload = {id: Id, email: Email, password: Password};

        const accessToken = await TokenService.generateAccessToken(actualPayload);
        const refreshToken = await TokenService.generateRefreshToken(actualPayload);

        const refreshSessionId = uuidv4();

        const rs_res = await RefreshSessionsRepository.createRefreshSession({
            refreshSessionId, clientId: Id, refreshToken, fingerprint
        });

        return {
            user,
            accessToken,
            refreshToken,
            accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
        };
    }

    static async getUserByToken(req){
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")?.[1];
        const user = await TokenService.verifyAccessToken(token);

        return user;
    }
}

export default AuthService;
