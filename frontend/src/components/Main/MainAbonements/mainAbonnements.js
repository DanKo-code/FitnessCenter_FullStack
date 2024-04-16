import React, {useEffect, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select, Slider} from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from 'axios';
import HouseIcon from "@mui/icons-material/House";
import Button from "@mui/material/Button";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

import sad_doing_abonnements_card from '../../../images/sad_doing_abonnements_card.jpg'

export default function MainAbonnements() {

    const [age, setAge] = useState('');
    const [titleSearch, setTitleSearch] = useState('');
    const [abonnements, setAbonnements] = useState([]);
    const [searchedAbonnements, setSearchedAbonnements] = useState([]);
    const [showAbonnementsList, setShowAbonnementsList] = useState(true);


    useEffect(() => {
        axios.get('http://localhost:3001/abonnements')
            .then(response => {
                setAbonnements(response.data);
                setSearchedAbonnements(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch abonnements:', error);
            });
    }, []);

    const handleTitleSearchChange = (event) => {

        setTitleSearch(event.target.value);

        if(!event.target.value){
            console.log('show all')

            setSearchedAbonnements(abonnements);
        }
        else{
            console.log('searched abonnements: '+JSON.stringify(abonnements.filter(abonnement => abonnement.Title.toLowerCase().includes(event.target.value.toLowerCase()))))

            setSearchedAbonnements(abonnements.filter(abonnement => abonnement.Title.toLowerCase().includes(event.target.value.toLowerCase())));
        }
    };

    useEffect(() => {
        if (searchedAbonnements.length === 0) {
            setShowAbonnementsList(false);
        } else {
            setShowAbonnementsList(true);
        }
    }, [searchedAbonnements]);

    const [priceRange, setPriceRange] = useState([20, 80]);

    const handlePriceRangeChange = (event, newValue) => {
        setPriceRange(newValue);

        setSearchedAbonnements(abonnements.filter(abonnement => abonnement.Price >= priceRange[0] && abonnement.Price <= priceRange[1]));
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
                <div style={{display: 'flex', justifyContent: 'space-between'}}>

                    <div style={{width: '40%'}}>
                        <div style={{textAlign: 'center'}}>Price:</div>
                        <Slider
                            aria-labelledby="range-slider"
                            value={priceRange}
                            onChange={handlePriceRangeChange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={400}
                        />
                    </div>

                    <TextField
                        style={{width: '40%'}}
                        fullWidth
                        id="search"
                        label="Name Search"
                        name="search"
                        autoComplete="search"
                        value={titleSearch}
                        onChange={handleTitleSearchChange}
                    />
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    {showAbonnementsList ? <div style={{marginTop: '40px', height: '400px', overflowY: 'scroll'}}>
                        {searchedAbonnements.map(abonnement => (
                            <div style={{
                                background: 'rgb(160, 147, 197)',
                                width: '600px',
                                height: '400px',
                                marginBottom: '10px'
                            }} key={abonnement.Id}>
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

                                        <div style={{
                                            marginBottom: '20px',
                                            display: 'flex',
                                            justifyContent: 'start',
                                            alignItems: 'center'
                                        }}>
                                            <CalendarMonthIcon fontSize="large" style={{marginRight: '10px'}}/>
                                            <div style={{fontSize: '14px'}}>Visiting Time:</div>
                                            <div style={{fontSize: '14px', marginLeft: '5px', marginRight: '5px'}}>
                                                {abonnement.VisitingTime}
                                            </div>

                                        </div>

                                        <div style={{
                                            marginBottom: '20px',
                                            display: 'flex',
                                            justifyContent: 'start',
                                            alignItems: 'center'
                                        }}>
                                            <LocalAtmIcon fontSize="large" style={{marginRight: '10px'}}/>
                                            <div style={{fontSize: '14px'}}>Price:</div>
                                            <div style={{
                                                fontSize: '14px',
                                                marginLeft: '5px',
                                                marginRight: '5px'
                                            }}>{abonnement.Price}</div>
                                        </div>
                                    </div>

                                    <div style={{width: '200px', paddingRight: '20px'}}>
                                        {/*{abonnement.Photo}*/}
                                        <img style={{width: '100%', height: 'auto'}} src={sad_doing_abonnements_card}/>
                                    </div>
                                </div>

                                <div style={{paddingLeft: '20px'}}>
                                    Services:
                                </div>
                                <div style={{
                                    paddingLeft: '20px',
                                    paddingRight: '40px',
                                    marginTop: '20px',
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <div style={{display: 'flex',}}>
                                        {abonnement.AbonementsService.map(AbonementService => (
                                            <div style={{marginRight: '10px'}}>
                                                <div style={{width: '80px', height: '60px'}}>
                                                    <img style={{width: '100%', height: 'auto'}}
                                                         src={sad_doing_abonnements_card}/>
                                                </div>
                                                <div>{AbonementService.Service.Title}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <Button
                                        style={{
                                            color: 'white',
                                            background: 'rgba(117,100,163,255)',
                                            width: '170px',
                                            height: '50px'
                                        }}
                                    >
                                        Buy
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div> : <div>There are no such abonnements</div>}
                </div>
            </div>
        </div>
    );
}