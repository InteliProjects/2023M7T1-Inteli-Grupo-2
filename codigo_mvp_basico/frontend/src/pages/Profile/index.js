import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import EditModal from "../../components/EditModal";
import DeleteModal from "../../components/DeleteModal";
import { ec2UrlUsers } from '../../constants/constants';
import Loading from "../../components/Loading";
import Alert from '../../components/Alert';

import axios from "axios";

/**
 * Component that renders the profile page
 * */
export default function Profile() {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [userId, setId] = useState(null);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [city, setCity] = useState(null);
    const [cpf, setCpf] = useState(null);
    const [cnpj, setCnpj] = useState(null);
    const [segment, setSegment] = useState(null);
    const [openingHours, setOpeningHours] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [userError, setUserError] = useState(false);
    const [message, setMessage] = useState('');

    const { id } = useParams();
 
    // open the edit modal
    const handleOpenEdit = () => setOpenEdit(true);

    // open the delete modal
    const handleOpenDelete = () => setOpenDelete(true);
    const navigate = useNavigate();

    /**
     * Gets the user information
     * */
    async function getUser() {
        setIsLoading(true);
        try {
            const response = await axios.get(ec2UrlUsers + '/users/' + id,
                {
                    headers: {
                    'Access-Control-Allow-Origin': '*',
                    },
                }
            );

            setIsLoading(false);

            const userData = response.data[0];
            setId(userData.id);
            setName(userData.name);
            setEmail(userData.email);
            setPhone(userData.phone);
            setCity(userData.city);
            setCpf(userData.cpf);
            setCnpj(userData.cnpj);
            setSegment(userData.segment);
            setOpeningHours(userData.working_hours);
        } catch (error) {
            console.log(error);
            setUserError(true);
            setIsLoading(false);
            setMessage("Erro ao carregar informações do usuário. Tente novamente mais tarde.");
            setTimeout(() => {
                setUserError(false);
                setMessage('');
                navigate("/home/" + id);
            }, 3000);
        }
    }

    /**
     * Updates the user information when confirmed
     * */
    const handleEditComplete = (newName, newEmail, newPhone, newCity) => {
        setName(newName);
        setEmail(newEmail);
        setPhone(newPhone);
        setCity(newCity);
    };

    useEffect(() => {
        getUser();
    }, []);


    /**
     * Redirects the user to the home page
     * */
    const back = () => {
        navigate("/home/" + id);
    };

    return (
        <div className="profile-container">
            {isLoading ? <div id="products-loading"><Loading /></div> : userError ? 
            <Alert success={false} message={message} style={{ position: 'absolute', marginTop: '1rem', marginLeft:'38rem'}} /> :
            <div>
            <div className="header">
                <KeyboardBackspaceIcon id="back" fontSize="large" onClick={back}/>
                <div className='title-div'><h2 className="title">Olá, {name}!</h2></div>
            </div>
            <div className="content">
                <h3 className='content-title'>Informações da conta</h3>
                <div className="forms">
                    <div className="form-row">
                        <input className={"profile-input"} type="text" value={name} disabled="true"/>
                        <input className={"profile-input"} type="text"  value={email} disabled="true"/>
                    </div>
                    <div className="form-row">
                        <input className={"profile-input"} type="text" value={phone} disabled="true"/>
                        <input className={"profile-input"} type="text" value={city} disabled="true"/>
                    </div>
                    <div className="form-row">
                        <input className={"profile-input"} type="text" value={cpf} disabled="true"/>
                        <input className={"profile-input"} type="text" value={cnpj} disabled="true"/>
                    </div>
                    <div className="form-row">
                        <input className={"profile-input"} type="text" value={segment} disabled="true"/>
                        <input className={"profile-input"} type="text" value={openingHours} disabled="true"/>
                    </div>
                </div>
            </div>
            <div className="buttons">
                <button className='div-button' id="edit" onClick={handleOpenEdit}>Editar</button>
                <button className='div-button' id="delete" onClick={handleOpenDelete}>Deletar Conta</button>
            </div>
            {openEdit && <EditModal openEdit={openEdit} setOpenEdit={setOpenEdit} onEditComplete={handleEditComplete} name={name} email={email} phone={phone} city={city} cpf={cpf} cnpj={cnpj} segment={segment} openingHours={openingHours} id={userId}/>}
            {openDelete && <DeleteModal openDelete={openDelete} setOpenDelete={setOpenDelete} id={userId}/>}
            </div>}
        </div>
    )
}