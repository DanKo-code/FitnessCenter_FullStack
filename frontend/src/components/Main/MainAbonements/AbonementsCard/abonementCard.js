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
import io from 'socket.io-client';
import {setUser} from "../../../../states/storeSlice/appStateSlice";
import showSuccessMessage from "../../../../utils/showSuccessMessage";
import ShowErrorMessage from "../../../../utils/showErrorMessage";


export default function AbonnementCard(props) {

    const dispatch = useDispatch();
    let user = useSelector((state) => state.userSliceMode.user);

    const {abonnement, width, height, buyButton, onClick, status} = props;

    const handleBuy = async (event) => {
        try {

            // Создаем новый объект, исключая свойство 'socket'
            const { socket, ...userWithoutSocket } = user;

            const postOrdersData = {
                abonementId: abonnement.Id
            }

            const response = await Resource.post('/orders', postOrdersData);

            if (response.status === 200) {
                showSuccessMessage("Abonement bought successfully");

                const createdOrderId = response.data.Id;

                const socketStartTimerData = {
                    orderId: createdOrderId,
                    abonementTitle: abonnement.Title,
                    abonementValidity: abonnement.Validity
                }

                if(user.socket){
                    user.socket.emit('startTimer', socketStartTimerData);
                }
                else{
                    const accessToken = inMemoryJWT.getToken();

                    let socket = await io('http://localhost:3002', {
                        reconnection: true,
                        reconnectionAttempts: 5,
                        reconnectionDelay: 1000,
                        extraHeaders: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                    socket.emit('startTimer', socketStartTimerData);
                    user.socket.on('expiration', (message) => {
                        showSuccessMessage(message);
                    });
                    user = {...user, socket: socket}
                    dispatch(setUser(user));
                }


            }
        } catch (e) {
            ShowErrorMessage(e);
            console.error('err: ' + JSON.stringify(e, null, 2))
        }
    }

    const styles = {
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            fontSize: '24px',
        },


    }

    return (
        <div onClick={onClick} style={{
            background: 'rgb(160, 147, 197)',
            width: width,
            height: height,
            marginBottom: '10px',
            position: "relative"
        }}>
            {status === 0 && <div style={styles.overlay}>Expired</div>}

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