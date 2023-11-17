import { ec2UrlSales } from "../../constants/constants";
import ProductCardSummary from "./ProductCardSummary";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import Alert from '../Alert';
import { useState } from "react";

/**
 * Component that renders the order summary with the delivery address and the products chosen
 * @param next: function that goes to the next page of the order
 * @param data: function that goes to the page where the user fills the delivery address
 * @param chooseProduct: function that redirects the user to the page where he can choose the products
 * @param qtd: array that stores the quantity of each product
 * @param cep: the address cep
 * @param address: the address street
 * @param number: the address number
 * @param complement: the address complement
 * @param neighborhood: the address neighborhood
 * @param state: the address state
 * @param city: the address city
 * @param chosenProducts: array that stores the chosen products
 * @param orderId: the order id
 * @param totalPrice: the total price of the products chosen
 */
export default function Summary({ next, data, chooseProduct, qtd, cep, address, number, complement, neighborhood, state, city, chosenProducts, orderId, totalPrice }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [success, setSuccess] = useState(null);
    /**
     * Deletes the order from the database
     * */
    const deleteOrder = async () => {
        try {
            const response = await axios.delete(ec2UrlSales + '/sales/' + orderId);
            if (response.status === 200) {
                setSuccess(true);
                alert("Pedido cancelado com sucesso!");
                setTimeout(() => {
                    navigate("/home/" + id);
                }, 1500);
            }
            else {
                setSuccess(false);
                setTimeout(() => {
                    setSuccess(null);
                }, 3000);
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className='data-content'>
            {success !== null && <Alert success={success} message={success ? "Usuário deletado com sucesso!" : "Erro ao deletar usuário"} style={{ position: 'absolute', marginTop: '1rem', marginLeft:'50rem', width: '300px' }} />}
            <h2 style={{ fontWeight: "700", fontSize: "28px", margin: "0" }}>Resumo</h2>
            <header className="address">
                <h2 style={{ fontWeight: "700", fontSize: "28px", margin: "0" }}>Endereço</h2>
                <p>Reveja suas informações para continuar:</p>
            </header>
            <div className="summary-address-info">
                <div className="address-input">
                    <p id="summary-cep">{cep}</p>
                </div>
                <div className="inputs">
                    <p id="summary-address">{address}</p>
                    <p id="summary-number">{number}</p>
                </div>
                <div className="inputs">
                    <p id="summary-complement">{complement}</p>
                    <p id="summary-neighborhood">{neighborhood}</p>
                </div>
                <div className="inputs">
                    <p id="summary-state">{state}</p>
                    <p id="summary-city">{city}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "row-reverse", padding: "3px" }}>
                    <p onClick={data} style={{ fontSize: "14px", textDecoration: "underline", fontWeight: "bold", cursor: "pointer" }}>Editar</p>
                </div>
            </div>
            <header className="address">
                <h2 style={{ fontWeight: "700", fontSize: "28px", margin: "0", marginTop: "4px" }}>Pedido</h2>
            </header>
            <ProductCardSummary chooseProduct={chooseProduct} qtd={qtd} chosenProducts={chosenProducts} />
            {totalPrice !== 0 && <div className="final-value">
                    <p style={{ fontSize: "18px", color: "rgba(66,74,83)", fontWeight: "400" }}>Total a pagar</p>
                    <div style={{ display: "flex", gap: "4px" }}>
                        <p style={{ textAlign: "left", fontSize: "20px", color: "rgba(0,168,104)", fontWeight: "600" }}>12x de R$ {(totalPrice / 12).toFixed(2)} </p>
                        <p style={{ fontSize: "20px", color: "rgba(66,74,83)"}}>ou R$ {totalPrice.toFixed(2)} à vista</p>
                    </div>
                </div> }
            <div className='data-footer'>
            <button id="data-cancel" style={{ marginRight:"10px" }} onClick={deleteOrder}>Cancelar Pedido</button>
                <button id="data-continue" onClick={next}>Continuar</button>
            </div>
        </div>
        
    )
}