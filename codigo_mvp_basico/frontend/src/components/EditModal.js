import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { ec2UrlUsers, validateEmail, validatePhone } from '../constants/constants';
import Alert from './Alert';
import InputMask from 'react-input-mask';
import Loading from './Loading';

import axios from 'axios';

/**
 * Component that renders the modal where the user can edit his account information
 * @param openEdit: boolean that indicates if the modal is open
 * @param setOpenEdit: function that sets the openEdit variable
 * @param onEditComplete: function that sets the user information
 * @param name: the user name
 * @param email: the user email
 * @param phone: the user phone
 * @param city: the user city
 * @param id: the user id
 */
export default function EditModal({openEdit, setOpenEdit, onEditComplete, name, email, phone, city, cpf, cnpj, segment, openingHours, id}) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50vw',
        height: '90vh',
        bgcolor: '#fff',
        borderRadius: '20px',
        '@media (max-width: 480px)': {
            width: '90vw',  // Adjust the width for smaller screens
            maxHeight: '90vh',
        },
    };

    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userPhone, setUserPhone] = useState(null);
    const [userCity, setUserCity] = useState(null);
    const [userCpf, setUserCpf] = useState(null);
    const [userCnpj, setUserCnpj] = useState(null);
    const [userSegment, setUserSegment] = useState(null);
    const [userOpeningHours, setUserOpeningHours] = useState(null);
    const [error, setError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setUserId(id);
        setUserName(name);
        setUserEmail(email);
        setUserPhone(phone);
        setUserCity(city);
        setUserCpf(cpf);
        setUserCnpj(cnpj);
        setUserSegment(segment);
        setUserOpeningHours(openingHours);
    }, [name, email, phone, city, cpf, cnpj, segment, openingHours, id]);

    /**
     * Validates the user information
     * */
    useEffect(() => {
        if (validateEmail(userEmail)) {
          setEmailError(false);
        }
        if (validatePhone(userPhone)) {
          setPhoneError(false);
        }
        if (userEmail !== '' && userName !== '' && userPhone !== '' && userCity !== '' && (userCnpj !== '' || userCpf !== '') && userSegment !== '' && userOpeningHours !== '') {
          setError(false);
        }
      }, [userEmail, userPhone, userName, userCity, userCnpj, userCpf, userSegment, userOpeningHours]);

    /**
     * Validates if the user has filled all the fields
     * @returns true if the user has filled all the fields, false otherwise
     * */
    const validateForms = () => {
        return userEmail !== '' && userName !== '' && userPhone !== '' && userCity !== '' && (userCnpj !== '' || userCpf !== '') && userSegment !== '' && userOpeningHours !== '';
    }

    /**
     * Updates the user information in the database
     * */
    async function updateUser() {
        try {
            const response = await axios.put(ec2UrlUsers + '/users',
            {
                "id": userId,
                "name": userName,
                "email": userEmail,
                "phone": userPhone,
                "city": userCity,
                "cpf": userCpf,
                "cnpj": userCnpj,
                "segment": userSegment,
                "working_hours": userOpeningHours
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            })
            if (response.status === 200) {
                setSuccess(true);
                setTimeout(() => {
                    setOpenEdit(false);
                }, 3000);
            }
            else {
                setSuccess(false);
                setTimeout(() => {
                    setSuccess(null);
                }, 3000);
            }
        } catch (error) {
            console.log(error);
            setSuccess(false);
            setTimeout(() => {
                setSuccess(null);
            }, 3000);
        }
    }

    /**
     * When the user clicks on the edit button, validates the information and updates the user
     * */
    const handleUpdate = async () => {
        if (!validateForms()) {
            setError(true);
        }
        else {
            if (!validatePhone(userPhone)) {
                setPhoneError(true);
              }
            if (!validateEmail(userEmail)) {
            setEmailError(true);
            }
            if (validateEmail(userEmail) && validatePhone(userPhone)) {
                setIsLoading(true);
                await updateUser();
                setIsLoading(false);
                onEditComplete(userName, userEmail, userPhone, userCity, userCpf, userCnpj, userSegment, userOpeningHours);       
            }
        }
    }

    /**
     * Closes the modal
     * */
    const handleClose = () => {
        setOpenEdit(false);
    }

    return (
        <div>
            <Modal
                open={openEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                {success !== null && <Alert success={success} message={success ? "Usuário atualizado com sucesso!" : "Erro ao atualizar usuário"} style={{ position: 'absolute', marginTop: '1rem', marginLeft:'45rem', width: '300px' }} />}
                <div className="modal-header">
                    <div className='title-div'><h2 className="modal-title">Editar Cadastro</h2></div>
                    <CloseIcon id="close" fontSize='large' onClick={() => handleClose()}/>
                </div>
                <div className="modal-content">
                    <div className="modal-forms">
                        <div className="form-row">
                            <input className="profile-input" type="text" value={userName} onChange={(e) => {setUserName(e.target.value)}}/>
                            <input className="profile-input" type="text" value={userEmail} onChange={(e) => {setUserEmail(e.target.value)}}/>
                            {emailError && <div className='error'>Formato Inválido</div>}
                        </div>
                        <div className='form-row'>
                        <InputMask
                            mask="(99) 99999-9999"
                            value={userPhone}
                            onChange={(e) => {
                            setUserPhone(e.target.value);
                            }}
                            className="profile-input"
                        />
                        {phoneError && <div className='error'>Formato Inválido</div>}
                        <input className="profile-input" type="text" value={userCity} onChange={(e) => {setUserCity(e.target.value)}}/>
                        </div>
                        <div className='form-row'>
                        <InputMask
                            style={userCnpj !== '' ? {backgroundColor: '#e9e9e9'} : {backgroundColor: '#fff'}}
                            disabled={userCnpj !== ''}
                            mask="999.999.999-99"
                            value={userCpf}
                            onChange={(e) => {
                            setUserCpf(e.target.value);
                            }}
                            className="profile-input"
                        />
                        <InputMask
                            style={userCpf !== '' ? {backgroundColor: '#e9e9e9'} : {backgroundColor: '#fff'}}
                            disabled={userCpf !== ''}
                            mask="99.999.999/9999-99"
                            value={userCnpj}
                            onChange={(e) => {
                                setUserCnpj(e.target.value);
                            }}
                            className="profile-input"
                        />
                        </div>
                        <div className="form-row">
                        <select
                            onChange={(e) => {
                                setUserSegment(e.target.value);
                              }}
                              value={userSegment}
                            className="profile-input"
                        >
                            <option value="" disabled>
                            Selecione o segmento
                            </option>
                            <option value="Tecnologia">Tecnologia</option>
                            <option value="Saúde">Saúde</option>
                            <option value="Educação">Educação</option>
                            <option value="Financeiro">Financeiro</option>
                            <option value="Alimentação">Alimentação</option>
                            <option value="Moda">Moda</option>
                            <option value="Construção">Construção</option>
                            <option value="Transporte">Transporte</option>
                            <option value="Artes">Artes</option>
                            <option value="Entretenimento">Entretenimento</option>
                            <option value="Esportes">Esportes</option>
                            <option value="Automotivo">Automotivo</option>
                            <option value="Bebidas">Bebidas</option>
                            <option value="Turismo">Turismo</option>
                            <option value="Animais de Estimação">Animais de Estimação</option>
                            <option value="Meio Ambiente">Meio Ambiente</option>
                            <option value="Agricultura">Agricultura</option>
                            <option value="Design">Design</option>
                            <option value="Consultoria">Consultoria</option>
                            <option value="Outros">Outros</option>
                        </select>
                        <InputMask
                            mask="99:99 às 99:99"
                            value={userOpeningHours}
                            onChange={(e) => {
                                setUserOpeningHours(e.target.value);
                            }}
                            className="profile-input"
                        />
                        </div>
                        {error && <div className='update-error'>Preencha todos os campos</div>}
                    </div>
                </div>
                <div className="button">
                <button className='div-button' id="save" onClick={() => handleUpdate()}>{!isLoading ? "Editar" :  <Loading />} </button>
            </div>
                </Box>
            </Modal>
        </div>
    )
}