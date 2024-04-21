import sad_doing_abonnements_card from "../../../images/sad_doing_abonnements_card.jpg";
import React, {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import AbonnementCard from "../MainAbonements/AbonementsCard/abonementCard";
import {setUser} from "../../../states/storeSlice/appStateSlice";
import {useDispatch, useSelector} from "react-redux";


export default function MainProfile() {

    const dispatch = useDispatch();

    //const [photo, setPhoto] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAbonnementsList, setShowAbonnementsList] = useState(true);
    const [abonnements, setAbonnements] = useState([]);

    let user = useSelector((state) => state.userSliceMode.user);

    // useEffect для установки данных пользователя
    useEffect(() => {

        if (user) {
            setLastName(user.LastName);
            setFirstName(user.FirstName);
            setEmail(user.Email);
            setPassword(user.Password);

            axios.post('http://localhost:3001/ordersByUser', user)
                .then(response => {

                    console.log('response.data!!!!!!!!!!!!!!!!!!!!!!!!!!: ' + JSON.stringify(response.data, null, 2))

                    console.log('just abonnements: ' + JSON.stringify(response.data.map(item => item.Abonement), null, 2));

                    setAbonnements(response.data.map(item => item.Abonement))

                })
                .catch(error => {
                    console.error('Failed to fetch abonnements:', error);
                });
        }
    }, [user]); // Выполнится только при изменении `user`

    useEffect(() => {
        console.log('After setAbonnements -> abonnements: ' + JSON.stringify(abonnements, null, 2))


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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const datae = {
            lastName: lastName,
            firstName: firstName,
            password: password,
            email: email
        }

        try {
            const response = await axios.post('http://localhost:3001/clients', datae);

            if (response.status === 200) {
                dispatch(setUser(response.data));
                setLastName(response.data.LastName);
                setFirstName(response.data.FirstName);
                setEmail(response.data.Email);
                setPassword(response.data.Password);
            }
        } catch (error) {
            console.error('response.status: ' + JSON.stringify(error.response.data.message, null, 2))
        }
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

                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </div>

                <div style={{width: '40%'}}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '20px',
                        fontSize: '24px'
                    }}>Purchased Abonnements
                    </div>
                    <div style={{height: '550px', overflowY: 'scroll'}}>
                        {setShowAbonnementsList ? <div>
                            {abonnements.map(abonnement => (
                                <AbonnementCard abonnement={abonnement}/>
                            ))}
                        </div> : <div>There are no orders</div>}
                    </div>
                </div>

            </div>
        </div>
    )
}