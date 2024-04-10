import React, {useState} from 'react';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import {setAppState} from '../../states/storeSlice/appStateSlice'
import {FitnessCenter} from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import {deepPurple} from "@mui/material/colors";
import HouseIcon from '@mui/icons-material/House';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import GroupsIcon from '@mui/icons-material/Groups';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import danilaAvatar from '../../images/danila_avatar.jpg'

export default function Main() {

    const dispatch = useDispatch();

    return (
        <div style={{display: 'flex', height: '100vh', color: 'white'}}>
            <div style={{width: '30%', height: '100vh', background: 'rgba(160, 147, 197, 1)'}}>
                <div style={{marginLeft: '10%', marginRight: '10%'}}>
                    <div style={{
                        display: 'flex',
                        justifyContent: "center",
                        alignItems: 'center',
                        marginTop: '50px',
                        gap: '10%'
                    }}>
                        <div style={{fontSize: '30px'}}>FitLab</div>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            background: 'rgba(117,100,163,255)',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: "center",
                            alignItems: 'center'
                        }}>
                            <FitnessCenter sx={{width: 50, height: 50}}/>
                        </div>

                    </div>

                    <div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Button style={{color: 'white', background: 'rgba(117,100,163,255)', marginTop: '5%'}}
                                    startIcon={< HouseIcon sx={{width: 50, height: 50}}/>}
                                    sx={{
                                        justifyContent: 'flex-start', // Выравнивание контента по левому краю
                                        paddingLeft: '25%', // Добавляем отступ слева для текста
                                    }}>
                                Main
                            </Button>

                            <Button style={{color: 'white', background: 'rgba(117,100,163,255)', marginTop: '5%'}}
                                    startIcon={< CardMembershipIcon sx={{width: 50, height: 50}}/>}
                                    sx={{
                                        justifyContent: 'flex-start', // Выравнивание контента по левому краю
                                        paddingLeft: '25%', // Добавляем отступ слева для текста
                                    }}>
                                Abonements
                            </Button>

                            <Button style={{color: 'white', background: 'rgba(117,100,163,255)', marginTop: '5%'}}
                                    startIcon={< GroupsIcon sx={{width: 50, height: 50}}/>}
                                    sx={{
                                        justifyContent: 'flex-start', // Выравнивание контента по левому краю
                                        paddingLeft: '25%', // Добавляем отступ слева для текста
                                    }}>
                                Couches
                            </Button>

                            <Button style={{color: 'white', background: 'rgba(117,100,163,255)', marginTop: '5%'}}
                                    startIcon={< ManageAccountsIcon sx={{width: 50, height: 50}}/>}
                                    sx={{
                                        justifyContent: 'flex-start', // Выравнивание контента по левому краю
                                        paddingLeft: '25%', // Добавляем отступ слева для текста
                                    }}>
                                Edit Profile
                            </Button>

                            <Button style={{color: 'white', background: 'rgba(117,100,163,255)', marginTop: '50%'}}
                                    startIcon={< ExitToAppIcon sx={{width: 50, height: 50, transform: 'scaleX(-1)'}}/>}
                                    sx={{
                                        justifyContent: 'flex-start', // Выравнивание контента по левому краю
                                        paddingLeft: '25%', // Добавляем отступ слева для текста
                                    }}
                                    onClick={event => {
                                        dispatch(setAppState('signIn'));
                                        event.stopPropagation()
                                    }}>
                                Exit
                            </Button>
                        </div>

                    </div>
                </div>

            </div>
            <div style={{width: '70%', height: '100vh', background: 'rgba(117,100,163,255)'}}>
                <div style={{marginTop: '50px', display: 'flex', justifyContent: "end", alignItems: 'center', gap: '5%', fontSize: '22px', marginRight: '5%'}}>
                    <Avatar
                        src={danilaAvatar}
                        sx={{ width: 100, height: 100 }}
                    />
                    <div>Danila Kozlyakovsky</div>
                </div>
                <div style={{height: '100vh'}}>
                    <div>
                        Welcome to the wonderful Fitness Center app, where you can
                        purchase subscriptions, view trainers and leave feedback for them,
                        edit your profile and view your purchase historyx
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div>

    );
}