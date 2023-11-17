import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { ec2UrlUsers } from '../constants/constants';
import axios from 'axios';
import Alert from './Alert';
import Loading from './Loading';

/**
 * Component that renders the modal where the user can delete his account
 * @param openDelete: boolean that indicates if the modal is open
 * @param setOpenDelete: function that sets the openDelete variable
 * @param id: the user id
 */
export default function EditModal({openDelete, setOpenDelete, id}) {
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50vw',
        height: '25vh',
        bgcolor: '#fff',
        borderRadius: '20px',
        '@media (max-width: 480px)': {
            width: '90vw',  // Adjust the width for smaller screens
            minHeight: '35vh', // Adjust the minimum height for smaller screens
        },
    };
    
    const [userId, setUserId] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setUserId(id);
    }, [id]);

    const handleClose = () => setOpenDelete(false);

    /**
     * Deletes the user from the database
     * */
    async function deleteUser() {
        setIsLoading(true);
        try{
        const response = await axios.delete(ec2UrlUsers + '/users/' + userId);
        setIsLoading(false);
        if (response.status === 200) {
            setSuccess(true)
            setTimeout(() => {
                window.location.replace("http://landing-page-nimbbbus.s3-website-us-east-1.amazonaws.com");
            }, 3000);
        }
        else {
            setSuccess(false)
        }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setSuccess(false)
            setTimeout(() => {
                setSuccess(null);
            }, 3000);
        }
    }

    const handleDelete = () => {
        deleteUser();
    }	

    return (
        <div>
            <Modal
                open={openDelete}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                {success !== null && <Alert success={success} message={success ? "Usuário deletado com sucesso!" : "Erro ao deletar usuário"} style={{ position: 'absolute', marginBottom: '35rem', marginLeft:'45rem', width: '300px' }} />}
                <div className="modal-delete-content">
                   <h3 className='content-title' id="title">Tem certeza que deseja deletar sua conta?</h3>
                </div>
                <div className="modal-buttons">
                <button className='div-button' id="yes" onClick={() => handleDelete()}>{!isLoading ? "Sim" : <Loading />}</button>
                <button className='div-button' id="no" onClick={() => handleClose()}>Não</button>
            </div>
                </Box>
            </Modal>
        </div>
    )
}