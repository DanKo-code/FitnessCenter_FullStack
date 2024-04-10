import React, {useState, useEffect} from 'react'
import SignUp from './components/signUp/signUp'
import SignIn from './components/signIn/signIn'
import Main from './components/Main/main'
import Button  from '@mui/material/Button'
import { useSelector } from "react-redux";



function App() {

    const appState = useSelector((state) => state.appSateSliceMode.appState);



    // Используйте useEffect для слежения за изменениями состояния и обновления компонента
    useEffect(() => {

        // Логика для обновления состояния компонента
        // Например, если возвращается строка "signUp", то отобразите компонент SignUp
        // Если возвращается строка "signIn", то отобразите компонент SignIn
    }, [appState]); // Передаем appState в массив зависимостей, чтобы useEffect запускался при изменении этого состояния


    return (
        <div className="App">

            {/* Условный рендеринг на основе состояния из Redux */}
            {appState === 'signUp' && <SignUp />}
            {appState === 'signIn' && <SignIn />}
            {appState === 'main' && <Main />}

        </div>
    );
}

export default App;
