import React, {useEffect, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from 'axios';
import HouseIcon from "@mui/icons-material/House";
import Button from "@mui/material/Button";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

import sad_doing_abonnements_card from '../../../images/sad_doing_abonnements_card.jpg'


export default function MainAbonnements() {

    const services = [{id: 1, name: 'Pool'}, {id: 2, name: 'Gym'}, {id: 3, name: 'Sauna'}]

    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [abonnements, setAbonnements] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/abonnements')
            .then(response => {
                setAbonnements(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch abonnements:', error);
            });
    }, []);

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
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <div style={{marginTop: '40px', height: '400px', overflowY: 'scroll' }}>
                        {abonnements.map(abonnement => (
                            <div style={{background: 'rgb(160, 147, 197)', width: '600px', height: '400px' , marginBottom: '10px'}}  key={abonnement.Id}>
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <div style={{marginTop: '5px', fontSize: '24px'}}>
                                        {abonnement.Title}
                                    </div>
                                </div>

                                <div style={{display: 'flex', marginTop: '20px', justifyContent: 'space-between'}}>
                                    <div style={{paddingLeft: '20px'}}>
                                        <div style={{
                                            marginBottom: '20px',
                                            display: 'flex',
                                            justifyContent: 'start',
                                            alignItems: 'center'
                                        }}>
                                            <AccessTimeIcon fontSize="large" style={{marginRight: '10px'}}/>
                                            <div style={{fontSize: '14px'}}>Validity Period:</div>
                                            <div style={{marginLeft: '5px', marginRight: '5px', fontSize: '14px'}}>
                                                {abonnement.Validity}
                                            </div>
                                            <div style={{fontSize: '14px'}}>months</div>
                                        </div>

                                        <div style={{marginBottom: '20px', display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
                                            <CalendarMonthIcon fontSize="large" style={{marginRight: '10px'}} />
                                            <div style={{fontSize: '14px'}} >Visiting Time:</div>
                                            <div style={{fontSize: '14px', marginLeft: '5px', marginRight: '5px'}}>
                                                {abonnement.VisitingTime}
                                            </div>

                                        </div>

                                        <div style={{marginBottom: '20px', display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
                                            <LocalAtmIcon fontSize="large" style={{marginRight: '10px'}} />
                                            <div style={{fontSize: '14px'}}>Price:</div>
                                            <div style={{fontSize: '14px', marginLeft: '5px', marginRight: '5px'}}>{abonnement.Price}</div>
                                        </div>
                                    </div>

                                    <div style={{width: '200px', paddingRight: '20px'}}>
                                        {/*{abonnement.Photo}*/}
                                        <img style={{ width: '100%', height: 'auto' }} src={sad_doing_abonnements_card}/>
                                    </div>
                                </div>

                                <div style={{paddingLeft: '20px', paddingRight:'40px', marginTop: '20px', display: 'flex', justifyContent: 'space-between'}}>
                                    <div style={{display: 'flex', }}>
                                        {services.map(service => (
                                            <div style={{marginRight: '10px'}}>
                                                <div style={{width: '80px', height: '60px'}}>
                                                    <img style={{width: '100%', height: 'auto'}}
                                                         src={sad_doing_abonnements_card}/>
                                                </div>
                                                <div>{service.name}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <Button
                                        style={{color: 'white', background: 'rgba(117,100,163,255)', width: '170px', height: '50px'}}
                                    >
                                        Buy
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}