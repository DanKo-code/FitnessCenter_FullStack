import React, {useEffect, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from 'axios';


export default function MainAbonnements() {

    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [abonnements, setAbonnements] = useState(axios.get('http://localhost:3001/abonnements'));



    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    return (
        <div style={{
            width: '70%',
            height: '100vh',
            background: 'rgba(117,100,163,255)',
            display: "flex",
            justifyContent: "center",
            alignItems: "center"

        }}>
            <div style={{
                marginLeft: '5%',
                marginRight: '5%'
            }}>
                <div style={{display: 'flex', justifyContent: 'space-between', gap: '150px'}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        id="search"
                        label="name search"
                        name="search"
                        autoComplete="search"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div>
                    {abonnements.map( abonnement =>
                        <div>
                        abonnement
                        </div>)


                    }
                </div>
                <div>Submit Button</div>
            </div>
        </div>
);
}