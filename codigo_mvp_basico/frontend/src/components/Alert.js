import { Alert, AlertTitle } from '@mui/material';

const AlertCard = ({ success, message, style }) => {
    return (
        <div
            style={style}
        >
            {success ? (
            <Alert severity="success">
                <AlertTitle>Sucesso</AlertTitle>
                {message}
            </Alert>
            ) : (
            <Alert severity="error">
                <AlertTitle>Erro</AlertTitle>
                {message}
            </Alert>
            )}
        </div>
    );
}

export default AlertCard;