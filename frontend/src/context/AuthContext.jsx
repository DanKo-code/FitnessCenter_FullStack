import {createContext, useState, useEffect} from "react";
import axios from "axios";
import config from "../config";
import inMemoryJWT from "../services/inMemoryJWT";
import {setUser} from "../states/storeSlice/appStateSlice";
import {useDispatch} from "react-redux";
import io from "socket.io-client";
import showSuccessMessage from "../utils/showSuccessMessage";

export const AuthClient = axios.create({
    baseURL: `${config.API_URL}/auth`,
    withCredentials: true,
})

export const Resource = axios.create({
    baseURL: `${config.API_URL}/resources`,
    withCredentials: true,
})

Resource.interceptors.request.use((config) => {
    const accessToken = inMemoryJWT.getToken();

    if(accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
}, (error) => {
    Promise.reject(error);
})

export const AuthContext = createContext({});

const AuthProvider = ({children}) => {

    const dispatch = useDispatch();

    const [isAppReady, setIsAppReady] = useState(false);
    const [isUserLogged, setIsUserLogged] = useState(false);
    const [data, setData] = useState();

    const LogOut = () => {
        AuthClient.post("/logout")
            .then(()=>{
                inMemoryJWT.deleteToken();
                setIsUserLogged(false);
            })
            .catch((e)=>{
                console.error(JSON.stringify(e, null, 2))
            });
    };

    const handleSignUp = async (data) => {
        const response = await AuthClient.post("/signUp", data);
        const {accessToken, accessTokenExpiration} = response.data;
        inMemoryJWT.setToken(accessToken, accessTokenExpiration);
        setIsUserLogged(true);
        return response
    };

    const handleSignIn = async (data) => {
        const response = await AuthClient.post("/signIn", data);
        const {accessToken, accessTokenExpiration} = response.data;
        inMemoryJWT.setToken(accessToken, accessTokenExpiration);
        setIsUserLogged(true);
        return response
    };

    useEffect(() => {
        AuthClient.post("/refresh")
            .then((res) =>{
                const{accessToken, accessTokenExpiration} = res.data;
                inMemoryJWT.setToken(accessToken, accessTokenExpiration);


                setIsAppReady(true);
                setIsUserLogged(true);

                let socket = io('http://localhost:3002');

                socket.on('expiration', (message) => {
                    console.log(message); // Обработка сообщения об истечении срока абонемента
                    showSuccessMessage(message);
                });

                let user = res.data.user;

                user.socket = socket

                dispatch(setUser(user));
            })
            .catch((e)=>{
                setIsAppReady(true);
                setIsUserLogged(false);
            })
    }, []);

    useEffect(() => {
        const handlePersistedLogOut = (event) => {
            if(event.key === config.LOGOUT_STORAGE_KEY){
                inMemoryJWT.deleteToken();
                setIsUserLogged(false);
            }
        };

        window.addEventListener("storage", handlePersistedLogOut);

        return () => {
            window.removeEventListener("storage", handlePersistedLogOut);
        };
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAppReady,
                isUserLogged,
                data,
                handleSignUp,
                handleSignIn,
                LogOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
