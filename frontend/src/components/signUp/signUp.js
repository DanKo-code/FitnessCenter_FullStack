import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function SignUp() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        });


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
                            Sign up
                        </h2>
                    </div>
                </div>

                <div style={{
                    display: "flex",
                    gap: '2%',
                    marginBottom: '2%'
                }}>
                    <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        value={firstName}
                        onChange={(event) => {
                            setFirstName(event.target.value)
                        }}
                    />
                    <TextField
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                        value={lastName}
                        onChange={(event) => {
                            setLastName(event.target.value)
                        }}
                    />
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
                    Sign Up
                </Button>
                <div style={{
                    display: 'flex',
                    justifyContent: "end"
                }}>
                    <Link href="#" variant="body2">
                        Already have an account? Sign in
                    </Link>
                </div>
            </div>
        </div>

    );
}