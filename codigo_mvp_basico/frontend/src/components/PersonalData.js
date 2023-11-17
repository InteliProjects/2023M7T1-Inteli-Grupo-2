import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import InputMask from 'react-input-mask';

/**
 * Component that renders the first part of the signup form, which contains the user's personal data
 * @param {boolean} success - boolean that indicates if the user has successfully signed up
 * @param {boolean} error - boolean that indicates if there is an error in the form
 * @param {function} setName - function that sets the user's name
 * @param {boolean} emailError - boolean that indicates if the user's email is invalid
 * @param {function} setEmail - function that sets the user's email
 * @param {function} setPassword - function that sets the user's password
 * @param {boolean} phoneError - boolean that indicates if the user's phone number is invalid
 * @param {function} setPhone - function that sets the user's phone number
 * @param {function} setCity - function that sets the user's city
 * @param {function} back - function that redirects the user to the login page
 * @param {function} secondPart - function that redirects the user to the second part of the signup form
 */
const PersonalData = ({ success, error, setName, emailError, setEmail, setPassword, phoneError, setPhone, setCity, back, secondPart }) => {
    return (
        <div className="signup-container">
        <KeyboardBackspaceIcon id="signup-back" fontSize="large" onClick={back} />
        <h1>Dados Pessoais</h1>
        <div className={error ? 'search-container-error' : 'search-container'}>
          <input
            type="text"
            placeholder="Nome completo"
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="signup-input"
          />
        </div>
        <div className={error || emailError ? 'search-container-error' : 'search-container'}>
          <input
            type="text"
            placeholder="E-mail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="signup-input"
          />
        </div>
        {emailError && <div className="error">Formato Inválido</div>}
        <div className={error ? 'search-container-error' : 'search-container'}>
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="signup-input"
          />
        </div>
        <div className={error || phoneError ? 'search-container-error' : 'search-container'}>
          <InputMask
            mask="(99) 99999-9999"
            placeholder="Celular"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            className="signup-input"
          />
        </div>
        {phoneError && <div className="error">Formato Inválido</div>}
        <div className={error ? 'search-container-error' : 'search-container'}>
          <input
            type="text"
            placeholder="Cidade"
            onChange={(e) => {
              setCity(e.target.value);
            }}
            className="signup-input"
          />
        </div>
        {error && <div className="error">Preencha todos os campos</div>}
        <div className="button-signup-container" onClick={secondPart}>
          <button>Continuar</button>
        </div>
      </div>
    )
}

export default PersonalData