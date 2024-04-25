import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import state from './states/store'
import {Provider} from "react-redux";
import {BrowserRouter} from 'react-router-dom';
import {AppRouter} from './AppRouter'
import {SnackbarProvider} from "notistack";
import AuthProvider from "./context/AuthContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <React.StrictMode>
            <Provider store={state}>
                <SnackbarProvider/>
                <BrowserRouter>
                    <AppRouter/>
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    </AuthProvider>

);
