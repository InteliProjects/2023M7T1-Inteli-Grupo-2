import { useState, useEffect } from 'react';
import axios from "axios"

/**
 * Component that renders the page where the user fills the delivery address
 * @param error: boolean that indicates if the user has filled all the fields
 * @param next: function that goes to the next page of the order
 * @param setCep: function that sets the cep
 * @param setAddress: function that sets the address
 * @param setNumber: function that sets the number
 * @param setComplement: function that sets the complement
 * @param setNeighborhood: function that sets the neighborhood
 * @param setState: function that sets the state
 * @param setCity: function that sets the city
 * @param cep: the address cep
 * @param state: the address state
 * @param address: the address street
 * @param number: the address number
 * @param complement: the address complement
 * @param neighborhood: the address neighborhood
 * @param city: the address city
 * @param selectedCep: the CEP inputed by the client
 */
export default function Data({ error, next, setCep, setAddress, setNumber, setComplement, setNeighborhood, setState, setCity, cep, state, address, number, complement, neighborhood, city, selectedCep }) {
    const [newCep, setThisCep] = useState(cep);
    const [newState, setThisState] = useState(state);

    useEffect(() => {
        if (cep.length === 9) {
            fetchAddressFromCep(cep);
        }
    });

    /**
     * Formats the cep
     * @param cep: the cep to be formatted
     * @returns the formatted cep
     * @example formatCep('12345678') // returns '12345-678'
     */
    const formatCep = (cep) => {
        cep = cep.replace(/\D/g, "");
        cep = cep.replace(/^(\d{5})(\d)/, "$1-$2");
        return cep.slice(0, 9);
    };

     /**
    * Function to find adress, neighborhood, state and city, given a cep
    * @param cep: the cep to find the other informations
    */
     const fetchAddressFromCep = async (cep) => {
        try {
          const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
          const data = response.data;
      
          if (!data.erro) {
            setAddress(data.logradouro);
            setNeighborhood(data.bairro);
            setState(data.uf);
            setCity(data.localidade);
          }
        } catch (error) {
          console.error(error);
        }
      };


    /**
     * Formats the state (only the first two letters with uppercase)
     * @param state: the state to be formatted
     * @returns the formatted state
     */
    const formatState = (state) => {
        return state.toUpperCase().slice(0, 2);
    };

    /**
     * Handles the cep change on the input and formats it
     * @param event: the event that triggered the function
     */
    const handleCepChange = (event) => {
        setCep(formatCep(event.target.value));
        setThisCep(formatCep(event.target.value));
    };

    /**
     * Handles the state change on the input and formats it
     * @param event: the event that triggered the function
     */
    const handleStateChange = (event) => {
        setState(formatState(event.target.value));
        setThisState(formatState(event.target.value));
    };
    
    return (
        <div className='data-content'>
            <header className="address">
                <h2 style={{ fontWeight: "700", fontSize: "28px", margin: "0" }}>Endereço</h2>
                <p>Sua maquininha será entregue no endereço informado</p>
            </header>
            <div className="address-info">
                <div className="address-input">
                    <input name="postal_code" value={newCep} onChange={handleCepChange} placeholder="CEP" id={!error ? "cep" : "cep-wrong"} type="text"/>                
                </div>
                <div className="inputs">
                    <input name="address" value={address} onChange={(e) => {setAddress(e.target.value)}} placeholder="Endereço" id={!error ? "address" : "address-wrong"} type="text"/>
                    <input name="number" value={number} onChange={(e) => {setNumber(e.target.value)}} placeholder="Número" id={!error ? "number" : "number-wrong"} type="text"/>
                </div>
                <div className="inputs">
                    <input name="complement" value={complement} onChange={(e) => {setComplement(e.target.value)}} placeholder="Complemento" id={!error ? "complement" : "complement-wrong"} type="text"/>
                    <input name="neighborhood" value={neighborhood} onChange={(e) => {setNeighborhood(e.target.value)}} placeholder="Bairro" id={!error ? "neighborhood" : "neighborhood-wrong"} type="text"/>
                </div>
                <div className="inputs">
                    <input name="state" value={newState} onChange={handleStateChange} placeholder="Estado (Ex.: AC)" id={!error ? "state" : "state-wrong"} type="text"/>
                    <input name="city" value={city} onChange={(e) => {setCity(e.target.value)}} placeholder="Cidade" id={!error ? "city" : "city-wrong"} type="text"/>
                </div>
                {error && <span id="error">Preencha todos os campos</span>}
            </div>
            <div className='data-footer'>
                <button id="data-continue" onClick={next}>Continuar</button>
            </div>
        </div>
    )
}