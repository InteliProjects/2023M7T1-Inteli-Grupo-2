import React from 'react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ec2UrlSales } from '../../constants/constants';
import Loading from '../Loading';
import Alert from '../Alert';

/**
 * Component that renders the page where the user fills the payment information
 * @param orderId: the order id
 */
export default function Payment({ orderId, products, totalPrice }) {
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const [error, setError] = useState(false);
    const [cardError, setCardError] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    /**
    * Formats the card number input to the format XXXX XXXX XXXX XXXX
    * @param input: the card number input to be formatted
    * @returns the formatted card number input with a maximum of 19 characters
    */
    const formatCardNumber = (input) => {
    // Remove any non-numeric characters from the input
    const numericInput = input.replace(/\D/g, '');

    // Split the numeric input into groups of four characters
    const formattedInput = numericInput.replace(/(\d{4})(?=\d)/g, '$1 ');

    return formattedInput.slice(0, 19);
    };

    /** 
    * Formats the cvv input to the format XXX
    * @param input: the cvv input to be formatted
    * @returns the formatted cvv input with a maximum of 3 characters
    */
    const formatCvv = (input) => {
        return input.slice(0, 3);
    };


    /**
     * Formats the month input to the format XX
     * @param input: the month input to be formatted
     * @returns the formatted month input with a maximum of 2 characters
     * */
    const formatMonth = (input) => {

        if(input > 12) {
            return 12;
        }

        return input.slice(0, 2);
    };

    /**
     * Formats the year input to the format XXXX
     * @param input: the year input to be formatted
     * @returns the formatted year input with a maximum of 4 characters
     * */
    const formatYear = (input) => {

        if (input < 2023 && input.length === 4) {
            return 2023;
        }

        return input.slice(0, 4);
    };

    /**
     * Changes the card number input to the formatted input
     * @param event: the event that triggered the function
     * */
    const handleInputChange = (event) => {
        const input = event.target.value;
        const formattedInput = formatCardNumber(input);
        setCardNumber(formattedInput);
    };

    /**
     * Changes the cvv input to the formatted input
     * @param event: the event that triggered the function
     * */
    const handleCvvChange = (event) => {
        const input = event.target.value;
        const formattedInput = formatCvv(input);
        setCvv(formattedInput);
    };

    /**
     * Changes the month input to the formatted input
     * @param event: the event that triggered the function
     * */
    const handleMonthChange = (event) => {
        const input = event.target.value;
        const formattedInput = formatMonth(input);
        setMonth(formattedInput);
    };

    /**
     * Changes the year input to the formatted input
     * @param event: the event that triggered the function
     * */
    const handleYearChange = (event) => {
        const input = event.target.value;
        const formattedInput = formatYear(input);
        setYear(formattedInput);
    };

    /**
     * Finishes the order and redirects the user to the home page
     */
    const finish = async () => {
        if (cardNumber.length !== 0 && cvv.length !== 0 && month.length !== 0 && year.length !== 0) {
            setError(false);
            if (cardNumber.length !== 19) {
                setCardError(true);
            }
            else {
                setCardError(false);
                setIsLoading(true);
                try {
                    const response = await axios.put(ec2UrlSales + '/sales/', {
                        "id": orderId,
                        "idProducts": products[0].id,
                        "idUser": id,
                        "value": totalPrice,
                        "status": "finalizada"
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Allow-Cross-Origin': '*'
                        }
                    })
                    setIsLoading(false);
                    if (response.status === 200) {
                        setSuccess(true);
                        setTimeout(() => {
                            setSuccess(null);
                            navigate("/monitoring/" + id);
                        }, 3000);
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.log(error);
                    setSuccess(false);
                    setTimeout(() => {
                        setSuccess(null);
                    }, 3000);
                }
            }
        }
        else {
            setError(true);
        }
    }

    return (
        <div className='payment-content'>
            {success !== null && <Alert success={success} message={success ? "Compra finalizada com sucesso!" : "Falha ao finalizar a compra. Tente novamente mais tarde."} style={{ position: 'absolute', marginBottom: '70rem', marginLeft: '36rem' }} />}
            <h2 style={{ fontWeight: "700", fontSize: "28px", margin: "0" }}>Pagamento</h2>
            <header className="address">
                <p>Adicione suas informações de pagamento:</p>
            </header>
            <div className="payment-info">
                <div className="payment-input">
                    <input name="card_number" value={cardNumber} onChange={handleInputChange} placeholder="Número do cartão" id={error ? "card-number-wrong" : "card-number"} type="text"/>
                    {cardError && <span id="error">Número do cartão inválido</span>}
                </div>
                <div className="inputs">
                    <input name="card-name" placeholder="Nome no cartão" id={error ? "card-name-wrong" : "card-name"} type="text"/>
                </div>
                <div className="inputs">
                    <input name="card-month" value={month} onChange={handleMonthChange} placeholder="Mês" id={error ? "card-month-wrong" : "card-month"} type="number"/>
                    <input name="card-year"  value={year} onChange={handleYearChange} placeholder="Ano" id={error ? "card-year-wrong" : "card-year"} type="number"/>
                    <input name="cvv" value={cvv} onChange={handleCvvChange} placeholder="CVV" id={error ? "cvv-wrong" : "cvv"} type="number"/>
                </div>
                {error && <span id="error">Preencha todos os campos</span>}
            </div>
            <div className='data-footer'>
                <button id="data-continue" onClick={finish}>{isLoading ? <div><Loading /></div> : "Finalizar"}</button>
            </div>
        </div>
    )
}