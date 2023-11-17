import { useState } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import InputMask from 'react-input-mask';
import LoadingSpinner from '../components/Loading';

/**
 * Component that renders the second part of the signup form, which contains the user's identification data
 * @param {function} setRgFile - function that sets the user's RG file
 * @param {function} setRevenue - function that sets the user's revenue
 * @param {function} handleClick - function that handles the click on the "Cadastrar" button
 * @param {boolean} error - boolean that indicates if there is an error in the form
 * @param {function} setIsFirstPart - function that sets the boolean that indicates if the user is in the first part of the signup form
 * @param {function} setCpf - function that sets the user's CPF
 * @param {string} cpf - string that contains the user's CPF
 * @param {function} setCnpj - function that sets the user's CNPJ
 * @param {string} cnpj - string that contains the user's CNPJ
 * @param {function} setSegment - function that sets the user's segment
 * @param {string} segment - string that contains the user's segment
 * @param {function} setOpeningHours - function that sets the user's opening hours
 * @param {boolean} isLoading - boolean that indicates if the user is waiting for the response of the API
 */
const Signup2 = ({ setRgFile, setRevenue, handleClick, error, setIsFirstPart, setCpf, cpf, setCnpj, cnpj, setSegment, segment, setOpeningHours, isLoading }) => {
  const [selectedFileName, setSelectedFileName] = useState('Coloque seu documento de identificação');

  /**
   * Function that handles the change of the user's RG file
   */
  const handleRgFileChange = (e) => {
    const file = e.target.files[0];
    setRgFile(file);

    const updatedFileName = file ? file.name : 'Nenhum arquivo selecionado';
    setSelectedFileName(updatedFileName);
  };

  /**
   * Function that handles the change of the user's revenue
   * @param {string} value - string that contains the user's revenue
   * @returns {string} - string that contains the user's revenue as a float with two decimal places
   * @example handleRvChange('R$ 1.000,00') // returns '1000.00'
   */ 
  const handleRvChange = (value) => {
    // Ensure the value is a string
    value = String(value);
  
    // Remove any non-numeric characters, except for the last two digits
    const numericValue = value.replace(/[^\d]/g, '');
  
    // Convert the numeric part to a float and divide by 100 to move the decimal point
    const floatValue = parseFloat(numericValue) / 100;
  
    // Format the float to have two decimal places
    const formattedValue = floatValue.toFixed(2);
    return formattedValue;
  };

  /**
   * Function that handles the click on the "Voltar" button
   * Goes back to the first part of the signup form
   */
  const back = () => {
    setIsFirstPart(true);
  };

  return (
      <div className="signup-container">
        <KeyboardBackspaceIcon id="signup-back-2" fontSize="large" onClick={back} />
        <h1>Dados de identificação </h1>
        <div className={error ? 'search-container-error' : cnpj !== '' ? 'disabled search-container' : 'search-container'}>
          <InputMask
            disabled={cnpj !== ''}
            mask="999.999.999-99"
            placeholder="CPF"
            onChange={(e) => {
              setCpf(e.target.value);
            }}
            className="signup-input"
          />
        </div>
        <div className={error ? 'search-container-error' : cpf !== '' ? 'disabled search-container' : 'search-container'}>
          <InputMask
            disabled={cpf !== ''}
            mask="99.999.999/9999-99"
            placeholder="CNPJ"
            onChange={(e) => {
              setCnpj(e.target.value);
            }}
            className="signup-input"
          />
        </div>
        <div className={error ? 'search-container-error' : 'search-container'}>
          <select
            onChange={(e) => {
              setSegment(e.target.value);
            }}
            value={segment}
            className="signup-input"
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
        </div>
        <div className={error ? 'search-container-error' : 'search-container'}>
          <InputMask
            mask="99:99 às 99:99"
            placeholder="Horário de Funcionamento"
            onChange={(e) => {
              setOpeningHours(e.target.value);
            }}
            className="signup-input"
          />
        </div>
        <div className={error ? 'search-container-error' : 'search-container'}>
          <InputMask
            mask="R$ 999.999,99"
            placeholder="Renda Líquida"
            onChange={(e) => {
              setRevenue(handleRvChange(e.target.value));
            }}
            className="signup-input"
          />
        </div>
        <div className={error ? 'search-container-error' : 'search-container'}>
          <label htmlFor="rgFile" className="file-input-label">
            {selectedFileName}
          </label>
          <input
            type="file"
            id="rgFile"
            name="rgFile"
            accept=".pdf, .jpg, .jpeg, .png"
            onChange={handleRgFileChange}
          />
        </div>
        {error && <div className="error">Preencha todos os campos</div>}
        <div className="button-signup-container" onClick={handleClick}>
          {!isLoading ? <button>Cadastrar</button> : <button><LoadingSpinner /></button>}
        </div>
      </div>
  );
};

export default Signup2;
