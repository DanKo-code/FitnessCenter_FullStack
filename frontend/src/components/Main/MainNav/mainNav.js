import {FitnessCenter} from "@mui/icons-material";
import Button from "@mui/material/Button";
import HouseIcon from "@mui/icons-material/House";
import {setAppState} from "../../../states/storeSlice/appStateSlice";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import GroupsIcon from "@mui/icons-material/Groups";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import React from "react";
import {useNavigate} from 'react-router-dom'

export default function MainNav() {

    const navigate = useNavigate();

    return (
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
                                }}

                                onClick={()=>{navigate('/main')}}
                                >
                            Main
                        </Button>

                        <Button style={{color: 'white', background: 'rgba(117,100,163,255)', marginTop: '5%'}}
                                startIcon={< CardMembershipIcon sx={{width: 50, height: 50}}/>}
                                sx={{
                                    justifyContent: 'flex-start', // Выравнивание контента по левому краю
                                    paddingLeft: '25%', // Добавляем отступ слева для текста
                                }}

                                onClick={()=>{navigate('/main/abonnements')}}
                                >
                            Abonnements
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
                                }}

                                onClick={()=>{navigate('/main/profile')}}>

                            Edit Profile
                        </Button>

                        <Button style={{color: 'white', background: 'rgba(117,100,163,255)', marginTop: '50%'}}
                                startIcon={< ExitToAppIcon sx={{width: 50, height: 50, transform: 'scaleX(-1)'}}/>}
                                sx={{
                                    justifyContent: 'flex-start', // Выравнивание контента по левому краю
                                    paddingLeft: '25%', // Добавляем отступ слева для текста
                                }}
                                onClick={()=>{navigate('/signIn');}}
                                >
                            Exit
                        </Button>
                    </div>

                </div>
            </div>

        </div>
    );
}