import sad_doing_coachs_card from '../../../../images/sad_doing_abonnements_card.jpg';
import Button from "@mui/material/Button";
import React, {useEffect, useState} from "react";
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import sad_doing_abonnements_card from "../../../../images/sad_doing_abonnements_card.jpg";
import {useLocation} from "react-router-dom";
import danilaAvatar from "../../../../images/danila_avatar.jpg";
import Carousel from "react-multi-carousel";
import mainCss from "../../../MainNavHome/MainNavHome.module.css";
import AbonnementCard from "../../MainAbonements/AbonementsCard/abonementCard";
import {Modal, TextareaAutosize } from "@mui/material";
import {Resource} from "../../../../context/AuthContext";
import showErrorMessage from "../../../../utils/showErrorMessage";
import ShowErrorMessage from "../../../../utils/showErrorMessage";
import ShowSuccessMessage from "../../../../utils/showSuccessMessage";



export default function CoachDetailsCard(props) {

    const location = useLocation();
    const {coach} = location.state || {}; // Получаем переданный пропс

    const [openModal, setOpenModal] = useState(false);
    const [reviewText, setReviewText] = useState("");
    const [coachComments, setCoachComments] = useState([]);

    useEffect(() => {

        if(coach.Comment){
            setCoachComments(coach.Comment.sort((a, b) => new Date(b.CreateDate) - new Date(a.CreateDate)))
        }
    }, []);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleReviewSubmit = async () => {

        try {

            const data = {
                reviewText: reviewText,
                coachId: coach.Id,
            }

            const response = await Resource.post('/comments', data);

            if(response.status === 200){
                console.log('postComments: '+ JSON.stringify(response, null, 2))

                setCoachComments(coachComments => [...coachComments, response.data].sort((a, b) => new Date(b.CreateDate) - new Date(a.CreateDate)))
                ShowSuccessMessage('Comment added successfully')
                setReviewText('');
                handleCloseModal();
            }
        } catch (e) {
            ShowErrorMessage(e);
            console.error('response.status: ' + JSON.stringify(e.response.data.message, null, 2))
        }
    };

    const handleRevieChange = async (e) => {
        const inputValue = e.target.value;

        if (inputValue.length > 500) {
            const truncatedText = inputValue.slice(0, 500);
            setReviewText(truncatedText);
        } else {
            setReviewText(inputValue);
        }
    }

    return (

        <div style={{width: '70%', height: '100vh', background: 'rgba(117,100,163,255)', overflowY: 'scroll'}}>

            {/* Модальное окно */}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <div
                    style={{
                        color: "white",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        background: "rgba(160, 147, 197, 1)",
                        borderRadius: "8px",
                        padding: "20px",
                        width: '300px'
                    }}
                >
                    <h2 id="modal-title">Leave a Review</h2>

                    <TextareaAutosize
                        style={{
                            width: "100%",
                            minHeight: "100px", // Минимальная высота для текстового поля
                            resize: "none", // Отключаем изменение размера по умолчанию
                            color: "white",
                            backgroundColor: "transparent", // Прозрачный фон
                            border: "1px solid white", // Белая рамка
                            borderRadius: "4px",
                            padding: "8px",
                            boxSizing: "border-box",
                        }}
                        value={reviewText}
                        onChange={handleRevieChange}
                        maxRows={10} // Максимальное количество строк для отображения
                    />

                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button
                            style={{
                                marginTop: "10px",
                                color: "white",
                                background: "rgba(117, 100, 163, 255)",
                            }}
                            onClick={handleReviewSubmit}
                        >
                            Submit
                        </Button>

                        <Button
                            style={{
                                marginTop: "10px",
                                color: "white",
                                background: "rgba(117, 100, 163, 255)",
                            }}
                            onClick={handleCloseModal}
                        >
                            Close
                        </Button>
                    </div>

                </div>
            </Modal>

            <div style={{
                marginLeft: '10%', marginRight: '10%',
                background: 'rgba(117,100,163,255)',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                marginTop: '50px',
            }}>
                <div style={{width: '400px', paddingRight: '20px'}}>
                    {/*{abonnement.Photo}*/}
                    <img style={{width: '100%', height: 'auto'}} src={sad_doing_abonnements_card}/>
                </div>

                <div style={{marginTop: '5px', fontSize: '24px'}}>
                    {coach.Name}
                </div>

                <div style={{marginTop: '5px', fontSize: '18px', marginBottom:"20px"}}>
                    {coach.Description}
                </div>

                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom:"20px"}}>

                    <div>
                        <div style={{paddingBottom: '15px', fontSize: '18px'}}>Services:</div>
                        <div style={{display: 'flex',}}>
                            {coach.CoachService.map(Service => (
                                <div style={{marginRight: '10px'}}>
                                    <div style={{width: '80px', height: '60px'}}>
                                        <img style={{width: '100%', height: 'auto'}}
                                             src={sad_doing_abonnements_card}/>
                                    </div>
                                    <div>{Service.Service.Title}</div>
                                </div>
                            ))}
                        </div>
                    </div>


                    <Button
                        style={{
                            marginTop: '20px',
                            color: 'white',
                            background: 'rgba(160, 147, 197, 1)',
                            width: '270px',
                            height: '50px',
                            marginBottom: '50px',
                        }}

                        onClick={handleOpenModal}
                    >
                        leave a review
                    </Button>
                </div>


                <div style={{marginTop: '5px', fontSize: '18px'}}>
                    Comments:
                </div>

                <div style={{display: 'flex', justifyContent: 'center', marginTop: '5px', width: '100%'}}>
                    {coachComments.length > 0 ? <div style={{marginTop: '40px'}}>
                        {coachComments.map(comment => (
                            /*<AbonnementCard abonnement={abonnement} width={'600px'} height={'400px'}
                                            buyButton={{buttonState: true}}/>*/


                            <div style={{
                                display: 'flex',
                                marginBottom: '50px',
                                background: 'rgba(160, 147, 197, 1)', padding:'10px', borderRadius: '10px', width:'100%'}}>
                                <div style={{marginRight: '10px'}}>
                                    <div style={{width: '100px'}}>
                                        {/*{abonnement.Photo}*/}
                                        <img style={{width: '100%', height: 'auto'}} src={sad_doing_abonnements_card}/>
                                    </div>
                                    <div style={{display: 'flex', gap: '4px'}}>
                                        <div>{comment.Client.FirstName}</div>
                                        <div>{comment.Client.LastName}</div>
                                    </div>
                                </div>

                                <div>{comment.CommentBody}</div>
                            </div>
                        ))}
                    </div> : <div>There are no comments</div>
                    }
                </div>
            </div>
        </div>
    )
}
