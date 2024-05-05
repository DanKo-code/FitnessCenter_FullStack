import Avatar from "@mui/material/Avatar";
import danilaAvatar from "../../../images/danila_avatar.jpg";
import Carousel from "react-multi-carousel";
import mainCss from "../../MainNavHome/MainNavHome.module.css";
import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";

import {
    FormControl, InputAdornment,
    InputLabel,
    ListItemText,
    MenuItem,
    Modal,
    OutlinedInput,
    Select,
    TextareaAutosize
} from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AbonnementCard from "../MainAbonements/AbonementsCard/abonementCard";
import {Resource} from "../../../context/AuthContext";
import showErrorMessage from "../../../utils/showErrorMessage";
import sad_doing_abonnements_card from "../../../images/sad_doing_abonnements_card.jpg";
import TextField from "@mui/material/TextField";
import {Checkbox} from "@mui/joy";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function MainAdminPanel() {

    const [abonnements, setAbonnements] = useState([]);
    const [openAbonnementsModal, setOpenAbonnementsModal] = useState(false);
    const [openCoachesModal, setOpenCoachesModal] = useState(false);
    const [openServicesModal, setOpenServicesModal] = useState(false);
    const [currentAbonnement, setCurrentAbonnement] = useState('');


    const handleOpenAbonnementsModal = async () => {
        setOpenAbonnementsModal(true);

        Resource.get('/abonnements')
            .then(response => {
                setAbonnements(response.data);
            })
            .catch(error => {
                showErrorMessage(error);
                console.error('Failed to fetch abonnements:', error);
            });

        Resource.get('/services')
            .then(response => {
                setAllServices(response.data);
            })
            .catch(error => {
                showErrorMessage(error);
                console.error('Failed to fetch services:', error);
            });
    }
    const handleCloseAbonnementsModal = () => {
        setOpenAbonnementsModal(false);
    };

    const handleOpenCoachesModal = async () => {
        setOpenCoachesModal(true);
    }

    const handleOpenServicesModal = async () => {
        setOpenServicesModal(true);
    }

    const handleAbonementSelection = async (selectedAbonnement) => {
        setCurrentAbonnement(selectedAbonnement);
    }

    const [title, setTitle] = useState('');
    const [validityPeriod, setValidityPeriod] = useState('');
    const [price, setPrice] = useState('');
    const [currentServices, setCurrentServices] = useState([]);
    const [allServices, setAllServices] = useState([]);

    const handleTitleChange = async (event) => {
        setTitle(event.target.value);
    }
    const handleValidityPeriodChange = async (event) => {
        setValidityPeriod(event.target.value);
    }

    const handlePriceChange = async (event) => {
        const input = event.target.value;

        // Очищаем все символы, кроме цифр
        const filteredInput = input.replace(/[^\d]/g, '');

        // Ограничиваем количество символов до определенной величины (например, 10)
        const maxLength = 10; // Максимальное количество символов
        const truncatedInput = filteredInput.slice(0, maxLength);

        // Обновляем состояние с отфильтрованным и обрезанным значением
        setPrice(truncatedInput);
    }

    const handleServicesChange = async (event) => {
        console.log('handleServicesChange->event.target.value: '+JSON.stringify(event.target.value, null, 2))
        setCurrentServices(event.target.value);
    }

    useEffect(() => {

        if(currentAbonnement){
            setTitle(currentAbonnement.Title);
            setValidityPeriod(currentAbonnement.Validity);
            setPrice(currentAbonnement.Price);
            setCurrentServices(currentAbonnement.AbonementService);
        }
        else{
            setTitle('');
            setValidityPeriod('');
            setPrice('');
            setCurrentServices([]);
        }

    }, [currentAbonnement]);

    return (
        <div style={{width: '70%', height: '100vh', background: 'rgba(117,100,163,255)'}}>

            {/* Модальное окно */}
            <Modal
                open={openAbonnementsModal}
                onClose={handleCloseAbonnementsModal}
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
                        background: "rgba(117,100,163,255)",
                        borderRadius: "8px",
                        padding: "20px",
                        width: '1000px',
                        height: '600px'
                    }}
                >
                    <div>
                        <IconButton onClick={handleCloseAbonnementsModal} size="large"
                                    sx={{position: 'absolute', top: 10, right: 10}}>
                            <CloseIcon/>
                        </IconButton>
                    </div>

                    <div style={{display: 'flex', marginTop: '10px',gap:'20px'}}>
                        <div style={{width: '40%'}}>
                            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '10px', fontSize: '18px'}}>
                                All Abonnements
                            </div>
                            <div style={{height: '550px', overflowY: 'scroll'}}>
                                {abonnements.length > 0 ? <div>
                                    {abonnements.map(abonnement => (
                                        <div key={abonnement.Id}>
                                    <div
                                        style={{border: currentAbonnement === abonnement ? '3px solid yellow' : 'none'}}>
                                        <AbonnementCard
                                            abonnement={abonnement}
                                            onClick={() => handleAbonementSelection(abonnement)}
                                        />
                                    </div>
                                </div>
                                    ))}
                                </div> : <div>There are no orders</div>}
                            </div>
                        </div>
                        <div style={{width: '60%', height: '100%'}}>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginBottom: '10px',
                                fontSize: '18px'
                            }}>
                                Create/Edit Abonnements
                            </div>

                            <div style={{display: 'flex', alignItems: "center", gap: "10px"}}>
                                <div style={{marginBottom: '20px'}}>
                                    {/*{abonnement.Photo}*/}
                                    <img style={{width: '200px', height: 'auto'}} src={sad_doing_abonnements_card}/>
                                </div>

                                <TextField style={{marginBottom: '10px'}}
                                           fullWidth
                                           label="Title"
                                           value={title}
                                           onChange={handleTitleChange}
                                />
                            </div>


                            <FormControl fullWidth style={{marginBottom: '10px'}}>
                                <InputLabel>Validity Period</InputLabel>
                                <Select

                                    value={validityPeriod}
                                    label="Validity Period"
                                    onChange={handleValidityPeriodChange}
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={12}>12</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth style={{marginBottom: '10px'}}>
                                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    label="Amount"
                                    value={price}
                                    onChange={handlePriceChange}
                                />
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel fullWidth>Services</InputLabel>
                                <Select
                                    fullWidth
                                    multiple
                                    value={currentServices}
                                    onChange={handleServicesChange}
                                    input={<OutlinedInput label="Tag" />}
                                    renderValue={(selected) => selected.map(sel => sel.Service.Title + ' ')}
                                    MenuProps={MenuProps}
                                >
                                    {allServices.map((service) => (
                                        <MenuItem key={service.Id} value={service.Title}>
                                            <Checkbox checked={currentServices.map(ser => ser.Service.Id).includes(service.Id)} />
                                            <ListItemText primary={service.Title} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>


                            <div style={{display: 'flex',
                                justifyContent: 'center',
                            marginTop:'100px'}}>
                                <Button
                                    style={{
                                        color: 'white',
                                        background: 'rgb(160, 147, 197)',
                                        height: '50px',
                                        width: '80%'
                                    }}

                                    /*
                                                                    onClick={handleSubmit}
                                    */
                                >
                                    Submit
                                </Button>
                            </div>

                        </div>
                    </div>


                </div>
            </Modal>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: "center",
                height: '100%',
                flexDirection: 'column'
            }}>
                <Button
                    style={{
                        marginTop: '20px',
                        color: 'white',
                        background: 'rgba(160, 147, 197, 1)',
                        width: '270px',
                        height: '50px',
                        marginBottom: '50px',
                    }}

                    onClick={handleOpenAbonnementsModal}
                >
                    Abonnements
                </Button>
                <Button
                    style={{
                        marginTop: '20px',
                        color: 'white',
                        background: 'rgba(160, 147, 197, 1)',
                        width: '270px',
                        height: '50px',
                        marginBottom: '50px',
                    }}

                    onClick={handleOpenCoachesModal}
                >
                    Coaches
                </Button>
                <Button
                    style={{
                        marginTop: '20px',
                        color: 'white',
                        background: 'rgba(160, 147, 197, 1)',
                        width: '270px',
                        height: '50px',
                        marginBottom: '50px',
                    }}

                    onClick={handleOpenServicesModal}
                >
                    Services
                </Button>
            </div>

        </div>
    );

}