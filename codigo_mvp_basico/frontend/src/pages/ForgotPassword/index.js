import React, { useState } from 'react';
import './forgot-pass-style.css';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Alert from '../../components/Alert';
import { useNavigate } from 'react-router-dom';
import { ec2UrlUsers, validateEmail } from '../../constants/constants';
import Loading from "../../components/Loading"

import axios from 'axios';

/**
 * Component that renders the page that the user puts his email to receive the code to change his password
 * */
const ForgotPassword = () => {
  const [error, setError] = useState(false); 
  const [userError, setUserError] = useState(false); 
  const [userMessageError, setUserMessageError] = useState("");
  const [email, setEmail] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  /**
   * Redirects the user to the login page
   * */
  const backToLogin = () => {
    navigate('/');
  };


  /**
   * Creates a random code with 6 digits
   * @returns newCode: the new code
   */ 
  const createCode = () => {
    let randNum = 0;
    let newCode = "";
    for(let i = 0; i < 6; i++){
      randNum = Math.floor(Math.random() * 10);
      newCode += randNum;
    }
    
    newCode = parseInt(newCode);
    return newCode;
  }

  /**
   * Validates the user email and sends the code to the user
   * Redirects the user to the next page
   * */
  const forgotPassword = async () => {
    if (email !== null) {
      setError(false);
      if (validateEmail(email)) {
        setIsLoading(true);
        setEmailError(false)
        setError(false);
        let {data, status} = await saveCode()
        setIsLoading(false);
      if(status === 200){
        setUserError(false);
        if(data.affectedRows === 0){
          setUserError(true);
          setUserMessageError("Email inválido")
          setTimeout(() => {
            setUserError(false);
          }, 3000);
        } else {
          setUserError(false);
          navigate('/forgotpassword2');
        }
      } else  {
        setUserError(true);
        setUserMessageError("Erro de autenticação dos dados")
        setTimeout(() => {
          setUserError(false);
        }
        , 3000);
      }
    }
      else {
        setEmailError(true)
      }
    }
    else {
      setError(true);
      
    }
  };


  /**
   * Validates the user email and adds the code to the database
   * @returns data: the response data
   * @returns status: the response status
   * */
  const saveCode = async () => {
    let code = createCode();
    console.log(code)
    try{
      const response = await axios.post(ec2UrlUsers + "/users/code", {
        "email": email,
        "code": code
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      })

      console.log(response)
      let data = response.data
      let status = response.status
      return {data, status}
      
    } catch (error) {
      console.log(error);
      return {data: null, status: 500}
    }
  }


  return (
    <div className="background">
      {userError && <Alert success={false} message={userMessageError} style={{ position: 'absolute', marginTop: '1rem', marginLeft:'65rem'}} />}
      <div className="container">
        <div className="centered-text-pass">
        <KeyboardBackspaceIcon id="password-back" fontSize="large" onClick={backToLogin} />
          <h1 style={{ fontSize: '45px', color: '#00A868', marginBottom: '10px' }}>Esqueci minha senha</h1>
          <p style={{fontSize: '20px', textAlign: 'center', width: '80%', marginBottom: '-8px'}}> Insira o mesmo email utilizado no cadastro para a redefinição de senha </p>
          <label className="email-label-pass">E-mail</label>
          <div className={(error || emailError) ? "search-container-email-error" : "search-container-email"}>
            <input type="email" id="email" placeholder="Digite seu E-mail" required="true" onChange={(e) => {setEmail(e.target.value)}}/>
          </div>
          {error && <div className='error-pass'>Preencha todos os campos</div>}
          {emailError && <div className="error-pass">Formato Inválido</div>}
          <div className="enter-button-pass" onClick={forgotPassword}> {isLoading ? <Loading /> : "Confirmar E-mail"} </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;