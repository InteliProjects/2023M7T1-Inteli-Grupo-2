import { useEffect } from 'react';
import ProductCard from '../../components/OrderMenus/ProductCard';
import axios from 'axios';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Loading from '../../components/Loading';

import { ec2UrlProducts } from '../../constants/constants';
import { useNavigate, useParams } from 'react-router-dom';

/**
 * Component that renders the page where the user chooses the products
 * @param next: function that goes to the next page of the order
 * @param setQtd: function that sets the quantity of the products
 * @param qtd: array that stores the quantity of each product
 * @param selectedCategory: the category of the products that will be shown (ton or stone)
 * @param products: array that stores the products
 * @param setProducts: function that sets the products
 * @param totalPrice: the total price of the products chosen
 * @param setTotalPrice: function that sets the total price of the products chosen
 * @param setChosenProducts: function that sets the chosen products that will be shown in the summary page
 * @param notProduct: boolean that indicates if the user has chosen at least one product
 */
export default function ChooseProduct({isLoading, setUserError, setMessage, next, setQtd, qtd, selectedCategory, products, setProducts, totalPrice, setTotalPrice, setChosenProducts, notProduct }) {

    const { id } = useParams();

    const navigate = useNavigate();

    /**
     * Goes to the next page of the order
     * @returns the products chosen by the user
     */
    const edit = () => {
        // Set the chosen products that will be shown in the summary page
        // eslint-disable-next-line array-callback-return
        products.map((product, index) => {
            if (qtd[index] > 0) {
                setChosenProducts(prevChosenProducts => {
                    if (selectedCategory === 'ton') {
                        prevChosenProducts[product.id - 3] = product;
                    }
                    else {
                        prevChosenProducts[product.id - 1] = product;
                    }
                    return prevChosenProducts;
                });
            }
        });
        next();
    }

    /**
     * Gets the products from the database according to the selected category
     */
    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get(
                ec2UrlProducts + (selectedCategory === 'ton' ? '/products/ton' : '/products/stone')
            );
            setProducts(response.data);
            } catch (error) {
                console.log(error);
                setUserError(true);
                setMessage('Erro ao carregar a página. Tente novamente mais tarde.');
                setTimeout(() => {
                    setUserError(false);
                    navigate('/home/' + id)
                }, 3000);
            }
        }
        getProducts();
    }, [])

    /**
     * Adds 1 to the quantity of the product selected
     * @param id: the id of the product that will have its quantity increased
     * @returns the new quantity of the product
     * */
    const addQtd = (id) => {
        if (qtd[id] <= products[id].available_quantity) {
            setQtd(prevQtd => {
                const newQtd = [...prevQtd];
                newQtd[id] += 1;
                setTotalPrice(totalPrice + products[id].price);
                return newQtd;
            });
        }
    }

    /**
     * Removes 1 to the quantity of the product selected
     * @param id: the id of the product that will have its quantity decreased
     * @returns the new quantity of the product
     * */
    const removeQtd = (id) => {
        if (qtd[id] > 0) {
            setQtd(prevQtd => {
                const newQtd = [...prevQtd];
                newQtd[id] -= 1;
                setTotalPrice(totalPrice - products[id].price);
                return newQtd;
            });
        }
    }

    return (
        <div className='order-content'>
            <div>
                <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>Quantas maquininhas seu negócio precisa?</h1>
                {products.map((product, index) => {
                    return (
                        <ProductCard addQtd={() => addQtd(index)} removeQtd={() => removeQtd(index)} qtd={qtd[index]} product={products[index]} />
                    )
                })}
                
            </div>
            {notProduct ? <div style={{ padding: "12px", backgroundColor: "#f384281a", border: "1.5px solid #f384281a", borderRadius: "8px", display:"flex" }}>
                    <WarningAmberIcon fontSize='small' style={{ color: "#f38428", marginRight:"12px" }}/>
                    <span style={{ color:"rgba(48,55,66)", fontSize:"14px",fontWeight:"600" }}>Para seguir com a contratação é necessário selecionar o mínimo de 1 maquininha</span>
                </div> : <div className='footer'>
                <div className="final-value">
                    <p style={{ fontSize: "18px", color: "rgba(66,74,83)", fontWeight: "400" }}>Total a pagar</p>
                    <div style={{ display: "flex", gap: "4px" }}>
                        <p style={{ textAlign: "left", fontSize: "20px", color: "rgba(0,168,104)", fontWeight: "600" }}>12x de R$ {(totalPrice / 12).toFixed(2)} </p>
                        <p style={{ fontSize: "20px", color: "rgba(66,74,83)"}}>ou R$ {totalPrice.toFixed(2)} à vista</p>
                    </div>
                </div> 
                <button id="continue" onClick={edit}>{isLoading ? <div><Loading /></div> : "Continuar"}</button>
            </div>}
        </div>
    )
}