import {Routes, Route, Navigate} from 'react-router-dom';

import SignIn from './components/signIn/signIn';
import MainNavHome from './components/MainNavHome/MainNavHome'
import SignUp from "./components/signUp/signUp";
import MainNavAbonnements from './components/MainNavAbonnements/MainNavAbonnements';
import MainNavProfile from "./components/MainNavProfile/MainNavProfile";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext";

export function AppRouter() {
    const {isUserLogged} = useContext(AuthContext);

    return (
        <Routes>
            {!isUserLogged ? (
                <>
                    <Route
                        path='/signin'
                        element={<SignIn/>}
                    />
                    <Route
                        path='/signup'
                        element={<SignUp/>}
                    />
                </>
            ) : (
                <>
                    <Route
                        path='/main'
                        element={<MainNavHome/>}
                    />
                    <Route
                        path='/main/abonnements'
                        element={<MainNavAbonnements/>}
                    />

                    <Route
                        path='/main/profile'
                        element={<MainNavProfile/>}
                    />
                </>
            )}

            <Route path="*" element={<Navigate to={isUserLogged ? "/main" : "/signin"}/>}></Route>

        </Routes>
    );
}