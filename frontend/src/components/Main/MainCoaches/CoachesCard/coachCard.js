import sad_doing_coachs_card from '../../../../images/sad_doing_abonnements_card.jpg';
import Button from "@mui/material/Button";
import React, {useEffect} from "react";
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import sad_doing_abonnements_card from "../../../../images/sad_doing_abonnements_card.jpg";
import {useNavigate} from "react-router-dom";



export default function CoachCard(props) {

    const {coach, width, height, imageSize, button, onClick} = props;
    const navigate = useNavigate();


    const handleDetails = async () =>{
        navigate('/main/coaches/details', { state: { coach } });
    }

    return (
        <div onClick={onClick} style={{
            background: 'rgb(160, 147, 197)',
            width: width,
            height: height,
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }} key={coach.Id}>
            <div style={{display: 'flex', justifyContent: 'center'}}>


                {/*<div style={{width: '320px', paddingRight: '20px'}}>
                    {abonnement.Photo}
                    <img style={{width: '100%', height: 'auto'}} src={sad_doing_abonnements_card}/>
                </div>*/}

                <div style={{width: imageSize ? imageSize : '320px', paddingRight: '20px'}}>
                    {/*{abonnement.Photo}*/}
                    <img style={{width: '100%', height: 'auto'}} src={sad_doing_abonnements_card}/>
                </div>

                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <div style={{marginTop: '5px', fontSize: '24px'}}>
                        {coach.Name}
                    </div>

                    {
                        button ?? <Button
                            style={{
                                color: 'white',
                                background: 'rgba(117,100,163,255)',
                                width: '170px',
                                height: '50px',
                                marginBottom: '50px'
                            }}

                            onClick={handleDetails}
                        >
                            Details
                        </Button>
                    }

                </div>

            </div>


        </div>
    )
}