import React, { useState, useEffect } from 'react';
import './monitoring.css';
import userImage from '../../assets/user.jpeg';
import { Stepper, Step, StepLabel } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import LoginIcon from '@mui/icons-material/Login';
import deliverTruckImage from '../../assets/deliver_truck.png';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useSelectedCep } from '../../contexts/SelectCepContext';
import { useParams } from 'react-router-dom';

const steps = ['Pedido Recebido', 'Em Preparação', 'Em Trânsito', 'Entregue'];

/**
 * @param selectedCep: int that represents the CEP inputed by the user   
 * @returns the time taken for the delivery to arrive at the buyer's address
 */
function calculatorDeliveryTime(selectedCep){
  const firstDigit = selectedCep.selectedCep.charAt(0);
  if (firstDigit === '0' || firstDigit === '1') {
    return '1 dia';
  } else if (firstDigit === '2' || firstDigit === '3') {
    return '2 dias';
  } else if (firstDigit === '4' || firstDigit === '5') {
    return '3 dias';
  } else if (firstDigit === '6' || firstDigit === '7') {
    return '5 dias';
  } else if (firstDigit === '8' || firstDigit === '9') {
    return '4 dias';
  } else {
    return 'insira um CEP válido';
  }
}

/**
 * Component that renders the monitoring page where the user can see the status of his order
 */
const Navbar = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [deliveryTime, setdeliveryTime] = useState('');
  const selectedCep = useSelectedCep();
  const { id } = useParams();

  /**
   * Function that advances the order status automatically
   */
  const autoAdvance = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      Cookies.set('deliveryStatus', 'Seu pedido chegou!', { expires: 7 });
    }
  };

  useEffect(() => {
    const temp = calculatorDeliveryTime(selectedCep);
    setdeliveryTime(temp);
    const interval = setInterval(autoAdvance, 6000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const navigate = useNavigate();

  /**
   * Function that redirects the user to the home page
   */
  const handleHomeClick = () => {
    navigate('/home/' + id);
  };

  const handleLoginClick = () => {
    navigate('/');
  };
  const handleUserClick = () => {
    navigate('/profile/' + id)
  };

  return (
    <div className='main'>
      <div className="navbar">
        <div onClick={handleUserClick} className="user-icon">
          <img src={userImage} alt="User Icon" />
        </div>
        <ul className="nav-links">
          <li onClick={handleHomeClick}><HomeIcon /></li>
          <li><WorkIcon /></li>
          <li onClick={handleLoginClick}><LoginIcon /></li>
        </ul>
      </div>
      <div className='contentContainer'>
        <div className="r">
          <div className="welcome-message">
            <span style={{ fontSize: '30px', textAlign: 'center', marginTop: '20px' }}>Olá!</span><br />
            <div style={{ marginTop: '12px' }}>
              {activeStep === steps.length - 1 ? 'Seu pedido chegou!' : `Tempo de envio estimado: ${deliveryTime}`}
            </div>
          </div>
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            style={{ marginTop: '10px', marginRight: '200px' }}
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  style={{
                    fontSize: '20px',
                    width: '70px',
                    height: '70px',
                    lineHeight: '80px',
                    position: 'relative',
                  }}
                >
                  {label}
                  {index === activeStep && (
                    <span
                      className={`status-dot ${index === activeStep ? 'status-dot-active' : ''}`}
                    ></span>
                  )}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        <div className='imageContainer'>
          <img
            src={deliverTruckImage}
            alt="Deliver Truck"
            style={{
              width: '100%',
              height: '100vh',
              marginLeft: '460px',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
