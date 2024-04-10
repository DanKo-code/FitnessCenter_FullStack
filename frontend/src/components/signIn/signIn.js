import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import {setAppState} from '../../states/storeSlice/appStateSlice'

export default function SignIn() {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {


        event.preventDefault();
        console.log({
            email: email,
            password: password,
        });

        const data = {
            email: email,
            password: password,
        }

        try {
            const response = await axios.post('http://localhost:3001/signIn', data);

            if (response.status === 200) {
                console.log('Registration successful!');
                console.log('responseData: ' + JSON.stringify(response.data));
                dispatch(setAppState('main'));
            }
        } catch (error) {
            console.error('response.status: ' + JSON.stringify(error.response.data.message, null, 2))
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            <div style={{
                width: '40%',
                padding: '20px',
            }}>
                <div style={{display: 'flex', justifyContent: "center"}}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: "column"
                    }}>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                                <LockOutlinedIcon/>
                            </Avatar>
                        </div>

                        <h2>
                            Sign in
                        </h2>
                    </div>
                </div>

                <div style={{
                    display: "flex",
                    gap: '2%',
                    marginBottom: '2%'
                }}>

                </div>

                <TextField style={{
                    marginBottom: '2%'
                }}
                           fullWidth
                           id="email"
                           label="Email Address"
                           name="email"
                           autoComplete="email"
                           value={email}
                           onChange={(event) => {
                               setEmail(event.target.value)
                           }}
                />
                <TextField style={{
                    marginBottom: '2%'
                }}
                           fullWidth
                           name="password"
                           label="Password"
                           type="password"
                           id="password"
                           autoComplete="new-password"
                           value={password}
                           onChange={(event) => {
                               setPassword(event.target.value)
                           }}
                />
                <Button style={{
                    marginBottom: '2%'
                }}
                        onClick={handleSubmit}
                        fullWidth
                        variant="contained"
                >
                    Sign In
                </Button>
                <div style={{
                    display: 'flex',
                    justifyContent: "end"
                }}>
                    <Link href="#" variant="body2"
                          onClick={event => {
                              dispatch(setAppState('signUp'));
                              event.stopPropagation()
                          }}>
                        Don't have an account? Sign up
                    </Link>
                </div>
            </div>
        </div>

    );
}