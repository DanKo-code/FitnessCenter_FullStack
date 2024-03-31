import React, {useState, useEffect} from 'react'
import SignUp from './components/signUp/signUp'
import Button  from '@mui/material/Button'

function App() {

    const [data, setData] = useState(null)

    useEffect(()=>{
        fetch('/api')
            .then(response=>response.json())
            .then(response => setData(response.message))
    },[])

    return (
        <div className="App">

            <SignUp></SignUp>

            {/*<header className="App-header">*/}
            {/*    <img  className="App-logo" alt="logo"/>*/}
            {/*    <p>*/}
            {/*        {*/}
            {/*            !data ? "Loading...":data*/}
            {/*        }*/}
            {/*    </p>*/}

            {/*</header>*/}

            {/*<section>*/}
            {/*    <Button variant="contained">Register</Button>*/}
            {/*</section>*/}
        </div>
    );
}

export default App;
