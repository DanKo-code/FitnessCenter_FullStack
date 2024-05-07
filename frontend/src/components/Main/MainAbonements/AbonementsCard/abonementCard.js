import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import sad_doing_abonnements_card from "../../../../images/sad_doing_abonnements_card.jpg";
import Button from "@mui/material/Button";
import React, {useEffect} from "react";
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import config from "../../../../config";
import inMemoryJWT from "../../../../services/inMemoryJWT";
import {Resource} from "../../../../context/AuthContext";
import io from 'socket.io-client'

export default function AbonnementCard(props) {

    const dispatch = useDispatch();
    let user = useSelector((state) => state.userSliceMode.user);

    const {abonnement, width, height, buyButton, onClick} = props;

    const handleBuy = async (event) => {
        try {

            const data = {
                abonnement: abonnement
            }

            const response = await Resource.post('/orders', data);

            if (response.status === 200) {
                console.log('before socket')
                const socket = io('http://localhost:3002'); // Подключение к серверу WebSocket
                socket.emit('startTimer', data);
                socket.on('expiration', (message) => {
                    console.log(message); // Обработка сообщения об истечении срока абонемента
                });
            }
        } catch (e) {
            console.error('response.status: ' + JSON.stringify(e.response.data.message, null, 2))
        }
    }

    return (
        <div onClick={onClick} style={{
            background: 'rgb(160, 147, 197)',
            width: width,
            height: height,
            marginBottom: '10px'
        }}>
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
                    {abonnement.AbonementService.map(Service => (
                        <div style={{marginRight: '10px'}}>
                            <div style={{width: '80px', height: '60px'}}>
                                <img style={{width: '100%', height: 'auto'}}
                                     src={sad_doing_abonnements_card}/>
                            </div>
                            <div>{Service.Service.Title}</div>
                        </div>
                    ))}
                </div>

                {buyButton ? <Button
                    style={{
                        color: 'white',
                        background: 'rgba(117,100,163,255)',
                        width: '170px',
                        height: '50px'
                    }}

                    onClick={handleBuy}
                >
                    Buy
                </Button> : <div/>}

            </div>
        </div>
    )
}