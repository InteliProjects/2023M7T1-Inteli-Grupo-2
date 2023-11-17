import React, { useEffect } from 'react';
import './signup-styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { ec2UrlUsers, validateEmail, validatePhone } from '../../constants/constants';
import axios from 'axios';
import PersonalData from '../../components/PersonalData';
import IdData from '../../components/IdData';
import Alert from '../../components/Alert';

/**
 * Component that renders the signup page
 */
const Signup = () => {
  const [error, setError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [isFirstPart, setIsFirstPart] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [segment, setSegment] = useState('');
  const [openingHours, setOpeningHours] = useState('');
  const [city, setCity] = useState('');
  const [revenue, setRevenue] = useState('');
  const [rgFile, setRgFile] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (validateEmail(email)) {
      setEmailError(false);
    }
    if (validatePhone(phone.trim())) {
      setPhoneError(false);
    }
    if (
      email !== '' &&
      name !== '' &&
      password !== '' &&
      phone !== '' &&
      city !== ''
    ) {
      setError(false);
    }
  }, [email, phone, name, password, city]);

  /**
   * Redirects the user to the second part of the signup page
   */
  const secondPart = () => {
    if (name === '' || email === '' || password === '' || phone === '' || city === '') {
      setError(true);
    }
    else {
      if (!validatePhone(phone)) {
        setPhoneError(true);
      }
      if (!validateEmail(email)) {
        setEmailError(true);
      }
      if (validateEmail(email) && validatePhone(phone)) {
        setIsFirstPart(false);
      }
    }
  };

  /**
   * Validates the user's input and creates the user
   */
  const handleClick = async () => {
    if ((cpf !== '' || cnpj !== '') && segment !== '' && openingHours !== '' && revenue && rgFile !== null) {
      setIsLoading(true);
      let status = await createUser();
      setIsLoading(false);
      if (status === 201) {
        setSuccess(true);

        // Redirecting based on the revenue after the signup
        const promoPage = calculatePromoPage(revenue);
        if (promoPage) {
          navigate(promoPage);
        }
      } else {
        setSuccess(false);
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      }
    } else {
      setError(true);
    }
  };

  /**
   * Function that creates the user in the database
   * @returns status: the response status
   * */
  const createUser = async () => {
    try {
      const response = await axios.post(
        ec2UrlUsers + '/users',
        {
          "name": name,
          "email": email,
          "password": password,
          "phone": phone,
          "city": city,
          "cpf": cpf,
          "cnpj": cnpj,
          "segment": segment,
          "working_hours": openingHours,
          "revenue": revenue,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );

      id = response.data.insertId;
      return response.status;
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Redirects the user to the login page
   * */
  const back = () => {
    navigate('/');
  };

  /**
   * Function that calculates the promo page based on the revenue
   * @param revenue: the revenue of the user
   * @returns the promo page
   * */
  const calculatePromoPage = (revenue) => {
    if (revenue >= 0 && revenue <= 6000) {
      return '/essential_promo/' + id;
    } else if (revenue > 6000 && revenue <= 10000) {
      return '/essential_promo2/' + id;
    } else if (revenue > 10000 && revenue <=80000) {
      return '/tompromo1/' + id;
    } else if (revenue > 80000) {
      return '/tompromo2/' + id;
    }

    return null;
  };

  return (
    <div className="body-container">
      {success !== null && <Alert success={success} message={success ? 'Usuário criado com sucesso' : 'Erro ao criar usuário'} style={{ position: 'absolute', marginBottom: '35rem', marginLeft: '65rem' }}/>}
      {isFirstPart ? 
        <PersonalData success={success} error={error} setName={setName} emailError={emailError} setEmail={setEmail} setPassword={setPassword} phoneError={phoneError} setPhone={setPhone} setCity={setCity} back={back} secondPart={secondPart}/>
        : <IdData setRgFile={setRgFile} setRevenue={setRevenue} revenue={revenue} handleClick={handleClick} error={error} setIsFirstPart={setIsFirstPart} setCpf={setCpf} cpf={cpf} setCnpj={setCnpj} cnpj={cnpj} setSegment={setSegment} segment={segment} setOpeningHours={setOpeningHours} isLoading={isLoading} />}
    </div>
  );
};

export default Signup;
