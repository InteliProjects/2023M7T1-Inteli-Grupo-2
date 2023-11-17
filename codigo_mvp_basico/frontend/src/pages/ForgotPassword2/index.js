// index.js
import React, { useState } from 'react';
import './forgot-pass-style-2.css';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Alert from '../../components/Alert';
import { useNavigate } from 'react-router-dom';
import { ec2UrlUsers } from '../../constants/constants';
import Loading from '../../components/Loading';

import axios from 'axios';

/**
 * Component that renders the page where the user chooses a new password
 * */
const ForgotPassword = () => {
  const [error, setError] = useState(false); 
  const [userError, setUserError] = useState(false); 
  const [userMessageError, setUserMessageError] = useState("");
  const [password, setPassword] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState(null);
  const [passError, setPassError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  // function that toggles the password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // function that toggles the confirm password visibility
  const toggleConfirmVisibility = () => {
    setShowConfirm((prevShowConfirm) => !prevShowConfirm);
  };

  /**
   * Redirects the user to the page to send a code
   * */
  const backToCheckEmail = () => {
    navigate('/forgotpassword');
  };

  /**
   * Validates the user code and newPassword and redirects him to the login page if the code is correct
   * */
  const changePassword = async () => {
    if (code !== null && password !== null && confirm !== null) {
      if (password === confirm) {
        setIsLoading(true);
        setError(false);
        setPassError(false)
        let {data, status} = await confirmUser()
        setIsLoading(false);
        console.log(data)
        if(status === 200){
          setUserError(false);
          if(data.affectedRows === 0){
            setUserError(true);
            setUserMessageError("Código inválido")
            setTimeout(() => {
              setUserError(false);
            }, 3000);
          } else {
            setUserError(false);
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false);
              navigate('/');
            }, 3000);
          }
        } else  {
          setUserError(true);
          setUserMessageError("Erro de autenticação dos dados")
          setTimeout(() => {
            setUserError(false);
          }, 3000);
        }
      }
      else {
        setError(false)
        setPassError(true)
      }
    }
    else {
      setError(true);
    }
  };

  /**
   * Changes the user password in the database
   * @returns data: the response data
   * @returns status: the response status
   * */
  const confirmUser = async () => {
    try{
      const response = await axios.post(ec2UrlUsers + "/users/confirm", {
        "code": code,
        "newPassword": password
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
    }
  }


  /**
   * Limits the code added by the user to 6 digits
   * @param code: the code added by the user
   * @returns the code with 6 digits
   * */
const formatCode = (code) => {
      return code.slice(0, 6);
  };

  /**
   * Handles the code change on the input and formats it
   * @param event: the event that triggered the function
   */
  const handleCodeChange = (event) => {
      setCode(formatCode(event.target.value));
  };

  return (
    <div className="background">
      {userError && <Alert success={false} message={userMessageError} style={{ position: 'absolute', marginTop: '1rem', marginLeft:'65rem' }} />}
      {success && <Alert success={success} message="Senha alterada com sucesso" style={{ position: 'absolute', marginTop: '1rem', marginLeft:'65rem'}} />}
      <div className="container">
        <div className="centered-text-pass">
        <KeyboardBackspaceIcon id="password-back" fontSize="large" onClick={backToCheckEmail} />
          <h1 style={{ fontSize: '45px', color: '#00A868', marginBottom: '10px' }}>Esqueci minha senha</h1>
          <p style={{fontSize: '20px', textAlign: 'center', width: '80%', marginBottom: '-8px'}}> Verifique o email inserido na página anterior para saber o código  </p>
          <div>
            <label className="code-label"> Código </label>
            <div className={error ? "search-container-email-error" : "search-container-email"}>
              <input type="number"value={code} id="email" placeholder="Digite o código de verificação" required="true" onChange={(e) => handleCodeChange(e)}/>
            </div>
            <label className="pass-label">Senha</label>
            <div className={(error || passError) ? "search-container-email-error" : "search-container-email"}>
              <input  type={showPassword ? 'text' : 'password'} id="email" placeholder="Digite sua nova senha" required="true" onChange={(e) => {setPassword(e.target.value)}}/>
              {showPassword?<VisibilityIcon className="eye-icon2" onClick={togglePasswordVisibility} />:<VisibilityOffIcon className="eye-icon2" onClick={togglePasswordVisibility} />}
            </div>
            <label className="confirm-pass-label">Confirme a senha</label>
            <div className={(error || passError) ? "search-container-email-error" : "search-container-email"}>
              <input  type={showConfirm ? 'text' : 'password'} id="email" placeholder="Confirme a nova senha" required="true" onChange={(e) => {setConfirm(e.target.value)}}/>
              {showConfirm?<VisibilityIcon className="eye-icon1" onClick={toggleConfirmVisibility} />:<VisibilityOffIcon className="eye-icon1" onClick={toggleConfirmVisibility} />}
            </div>
          </div>
          {error && <div className='error-pass'>Preencha todos os campos</div>}
          {passError && <div className="error-pass">As senhas não são as mesmas</div>}
          <div className="enter-button-pass" onClick={changePassword}>{isLoading ? <Loading /> : "Alterar senha" }</div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;