import sad_doing_abonnements_card from "../../../images/sad_doing_abonnements_card.jpg";
import React, {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import AbonnementCard from "../MainAbonements/AbonementsCard/abonementCard";

export default function MainProfile() {

    //const [photo, setPhoto] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAbonnementsList, setShowAbonnementsList] = useState(true);
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


    useEffect(() => {
        if (abonnements.length === 0) {
            setShowAbonnementsList(false);
        } else {
            setShowAbonnementsList(true);
        }
    }, [abonnements]);

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }



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
                marginRight: '5%',

                height: '600px',

                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <div style={{width: '40%', display: 'flex', flexDirection: 'column'}}>
                    <div style={{marginBottom: '20px'}}>
                        {/*{abonnement.Photo}*/}
                        <img style={{width: '100%', height: 'auto'}} src={sad_doing_abonnements_card}/>
                    </div>
                    <TextField style={{marginBottom: '20px'}}
                               fullWidth
                               label="Last Name"
                               value={lastName}
                               onChange={handleLastNameChange}
                    />
                    <TextField style={{marginBottom: '20px'}}
                               fullWidth
                               label="First Name"
                               value={firstName}
                               onChange={handleFirstNameChange}
                    />
                    <TextField style={{marginBottom: '20px'}}
                               fullWidth
                               label="Password"
                               value={password}
                               onChange={handlePasswordChange}
                    />
                    <TextField style={{marginBottom: '20px'}}
                               fullWidth
                               label="Email"
                               value={email}
                               onChange={handleEmailChange}
                    />
                    <Button
                        style={{
                            color: 'white',
                            background: 'rgb(160, 147, 197)',
                            height: '50px'
                        }}
                    >
                        Submit
                    </Button>
                </div>

                <div style={{width: '40%'}}>
                    <div style={{display: 'flex', justifyContent: 'center', marginBottom: '20px', fontSize: '24px'}}>Purchased Abonnements</div>
                    <div style={{ height: '550px', overflowY: 'scroll'}}>
                        {abonnements.map(abonnement => (
                            <AbonnementCard abonnement={abonnement}/>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}