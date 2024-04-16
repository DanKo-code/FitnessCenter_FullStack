import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import sad_doing_abonnements_card from "../../../../images/sad_doing_abonnements_card.jpg";
import Button from "@mui/material/Button";
import React from "react";

export default function AbonnementCard(props) {

    const { abonnement, width, height } = props;

    return (
        <div style={{
            background: 'rgb(160, 147, 197)',
            width: width,
            height: height,
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
    )
}