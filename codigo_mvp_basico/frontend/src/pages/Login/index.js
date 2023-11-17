// index.js
import React, { useState } from 'react';
import './login-styles.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Alert from '../../components/Alert';
import { useNavigate } from 'react-router-dom';
import { ec2UrlUsers } from '../../constants/constants';

import axios from 'axios';
import LoadingSpinner from '../../components/Loading';

/**
 * Component that renders the login page
 * */
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false); 
  const [userError, setUserError] = useState(false); 
  const [userMessageError, setUserMessageError] = useState("");
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  /**
   * Toggles the password visibility
   * */
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const navigate = useNavigate();

  /**
   * Redirects the user to the signup page
   * */
  const handleClick = () => {
    navigate('/signup');
  };

  const forgotPassword = () => {
    navigate('/forgotpassword');
  };

  /**
   * Validates the user credentials and redirects him to the home page if they are correct
   * */
  const login = async () => {
    if (email !== null && password !== null) {
      setError(false);
      setIsLoading(true);
      let {data, status} = await loginUser()
      setIsLoading(false);
      if(status === 200){
        setUserError(false);
        if(data.length === 0){
          setUserError(true);
          setUserMessageError("Email ou senha inválidos")
          setTimeout(() => {
            setUserError(false);
          }, 3000);
        } else {
          setUserError(false);
          navigate('/home/' + data[0].id);
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
      setError(true);
      
    }
  };

  /**
   * Validates the user credentials
   * @returns data: the response data
   * @returns status: the response status
   * */
  const loginUser = async () => {
    try{
      const response = await axios.post(ec2UrlUsers + "/users/login", {
        "email": email,
        "password": password
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      })

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
      {userError && <Alert success={false} message={ userMessageError } style={{ position: 'absolute', marginTop: '1rem', marginLeft:'65rem'}} />}
      <div className="container">
        <div className="centered-text-login">
          <h1 style={{ fontSize: '60px', color: '#00A868', marginBottom: '0' }}>nimBBBus</h1>
          <label className="email-label">E-mail</label>
          <div className={error ? "search-container-email-error" : "search-container-email"}>
            <input type="email" id="email" placeholder="Digite seu E-mail" required="true" onChange={(e) => {setEmail(e.target.value)}}/>
          </div>
          <label className="password-label">Senha</label>
          <div className={error ? "search-container-email-error" : "search-container-password"} style={{ marginTop: '40px' }}>
            <input type={showPassword ? 'text' : 'password'} id="password" placeholder="Digite sua senha" required="true" onChange={(e) => {setPassword(e.target.value)}}/>
            {showPassword?<VisibilityIcon className="eye-icon" onClick={togglePasswordVisibility} />:<VisibilityOffIcon className="eye-icon" onClick={togglePasswordVisibility} />}
          </div>
          {error && <div className='error'>Preencha todos os campos</div>}
          {!isLoading ? <button className="enter-button" onClick={login} disabled={isLoading}>Entrar</button> : <button className="enter-button" onClick={login} disabled={isLoading}><LoadingSpinner /></button>}
          <div className="register-link">
            Ainda não tem cadastro? <span className="click-here" onClick={handleClick}>Clique aqui</span>
          </div>
          <span className="click-here" onClick={forgotPassword}> Esqueci minha senha </span>
        </div>
      </div>
    </div>
  );
};
export default Login;
