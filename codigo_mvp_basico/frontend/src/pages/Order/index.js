import './style.css';
import Machine from '../../assets/credit-card-machine.png';
import MachineActive from '../../assets/credit-card-machine-active.png';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DescriptionIcon from '@mui/icons-material/DescriptionOutlined';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import Alert from '../../components/Alert';
import Loading from '../../components/Loading';

import { useEffect, useState } from 'react';
import ChooseProduct from '../../components/OrderMenus/ChooseProduct';
import Data from '../../components/OrderMenus/Data';
import Summary from '../../components/OrderMenus/Summary';
import Payment from '../../components/OrderMenus/Payment';
import { useSelectedCategory } from '../../contexts/SelectedCategoryContext';
import { useSelectedCep } from '../../contexts/SelectCepContext';
import { useStatus } from '../../contexts/OrderStatusContext';
import { ec2UrlSales } from '../../constants/constants';

import { useParams } from 'react-router-dom';
import axios from 'axios';

/**
 * Component that renders the order page
 * */
export default function Order() {
    const [machineActive] = useState(true);
    const [dataActive, setDataActive] = useState(false);      
    const [summaryActive, setSummaryActive] = useState(false);
    const [paymentActive, setPaymentActive] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [userError, setUserError] = useState(false);
    const [message, setMessage] = useState('');

    const [cep, setCep] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [complement, setComplement] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');

    const [qtd, setQtd] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
    const [error , setError] = useState(false);
    const [products, setProducts] = useState([]);
    const [chosenProducts, setChosenProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0.00);
    const [orderId, setOrderId] = useState('');
    const [notProduct, setNotProduct] = useState(true);
    const [isLoading] = useState(false);
    const [isLoadingReq, setIsLoadingReq] = useState(false);
    const [success, setSuccess] = useState(null);

    const { selectedCategory } = useSelectedCategory();
    const { setSelectedCep } = useSelectedCep();
    const { selectedCep } = useSelectedCep();
    const { status } = useStatus();
    const { id } = useParams(); 

    /**
     * If the order is still processing, the user is redirected to the summary page
     */
    useEffect(() => {
        if (status === 'processando') {
            setDataActive(true);
            setSummaryActive(true);
        }
    }, [status])

    /**
     * If none of the products are chosen, a message that he needs to choose at least one product is shown
     * */
    useEffect(() => {
        for (let i = 0; i < qtd.length; i++) {
            if (qtd[i] !== 0) {
                setNotProduct(false);
            }
        }
    }, [qtd])

    /**
     * Goes to the next page of the order
     */
    const next = async () => {
        if (machineActive && !dataActive && !summaryActive && !paymentActive) {
            // If the user is editing the order, when he clicks to go to the next page, the order is updated and the user is redirected to the summary page
            if (isEditing) {
                setIsLoadingReq(true);
                // the order is updated
                try {
                    const response = await axios.put(ec2UrlSales + '/sales', {
                        "id": orderId,
                        "idProduct": products[0].id,
                        "idUser": id,
                        "value": totalPrice,
                        "status": "processando"
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Allow-Cross-Origin': '*'
                        }
                    })
                    setIsLoadingReq(false);
                    if (response.status === 200) {
                        setOrderId(response.data.insertId);
                        setSuccess(true);
                        setMessage("Pedido atualizado com sucesso!");
                        setDataActive(true);
                        setSummaryActive(true);
                    }
                    else {
                        setSuccess(false);
                        setMessage('Ocorreu um erro ao salvar o pedido. Tente novamente mais tarde.');
                        setTimeout(() => {
                            setSuccess(null);
                            setMessage('');
                        }, 2000);
                    }
                } 
                catch (error) {
                    setIsLoadingReq(false);
                    console.log(error);
                    setSuccess(false);
                        setMessage('Ocorreu um erro ao salvar o pedido. Tente novamente mais tarde.');
                        setTimeout(() => {
                            setSuccess(null);
                            setMessage('');
                        }, 2000);
                }
            }
            // If the user is not editing the order, when he clicks to go to the next page, the order is created and the user is redirected to the data page
            else {
                if (!notProduct) {
                    setIsLoadingReq(true);
                    // the order is created with a status of 'processando'
                    try {
                        const response = await axios.post(ec2UrlSales + '/sales', {
                            "idProduct": products[0].id,
                            "idUser": id,
                            "value": totalPrice,
                            "status": "processando"
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Allow-Cross-Origin': '*'
                            }
                        })
                        setIsLoadingReq(false);
                        if (response.status === 201) {
                            console.log(response.data.insertId);
                            setOrderId(response.data.insertId);
                            setSuccess(null);
                            setMessage('');
                            setDataActive(true);
                        }
                        else {
                            setSuccess(false);
                            setMessage('Ocorreu um erro ao salvar o pedido. Tente novamente mais tarde.');
                            setTimeout(() => {
                                setSuccess(null);
                                setMessage('');
                            }, 2000);
                        }
                    } 
                    catch (error) {
                        console.log(error);
                        setIsLoadingReq(false);
                        setSuccess(false);
                            setMessage('Ocorreu um erro ao salvar o pedido. Tente novamente mais tarde.');
                            setTimeout(() => {
                                setSuccess(null);
                                setMessage('');
                            }, 2000);
                    }  
                }
            }
        }
        if (dataActive) {
            if (cep !== '' && address !== '' && number !== '' && complement !== '' && neighborhood !== '' && state !== '' && city !== '') {
                setSelectedCep(cep);
                console.log(cep);
                setError(false);
                setSummaryActive(true); 
            }
            else {
                setError(true);
                setSummaryActive(false);
            }
        }
        if (summaryActive) {
            console.log(selectedCep);
            setPaymentActive(true);
        }
    }

    /**
     * Goes to the products page
     */
    const chooseProduct = () => {
        setIsEditing(true);
        setDataActive(false);
        setSummaryActive(false);
        setPaymentActive(false);
    }

    /**
     * Goes to the data page
     * */
    const data = () => {
        setSummaryActive(false);
        setPaymentActive(false);
    }

    /**
     * Goes to the summary page
     * */
    const summary = () => {
        setPaymentActive(false);
    }

    return(
        <div>
            {isLoading ? (<div id="products-loading"><Loading /></div> ) : userError ? 
            (<Alert success={false} message={message} style={{ position: 'absolute', marginTop: '1rem', marginLeft:'57rem'}} />)  : (<div>
            <div className="order-header">
                    {success !== null && <Alert success={success} message={message} style={{ position: 'absolute', marginBottom: '20rem', marginLeft: '55rem' }} />}
                <div className="header-container">
                    <a id="logo" href="/home/1">nimBBBus</a>
                </div>
            </div>
            <div className="order-container">
                <div className="menu-container">
                    <div className='menu'>
                        <div id="machine" onClick={chooseProduct}>
                            <img className={machineActive ? 'icons-active' : 'icons'} src={machineActive ? MachineActive : Machine} alt="maquininha"/>
                            <p className={machineActive ? 'menu-text-active' : 'menu-text'}>Maquininhas</p>
                            <p className={machineActive ? 'menu-text-active' : 'menu-text'}> {'>'} </p>
                        </div>
                        <div id="data" onClick={data}>
                            <PersonOutlineIcon className={dataActive ? 'icons-active' : 'icons'} fontSize='large'/>
                            <p className={dataActive ? 'menu-text-active' : 'menu-text'}>Dados</p>
                            <p className={dataActive ? 'menu-text-active' : 'menu-text'}> {'>'} </p>
                        </div>
                        <div id="summary" onClick={summary}>
                            <DescriptionIcon className={summaryActive ? 'icons-active' : 'icons'} fontSize='large'/>
                            <p className={summaryActive ? 'menu-text-active' : 'menu-text'}>Resumo</p>
                            <p className={summaryActive ? 'menu-text-active' : 'menu-text'}> {'>'} </p>
                        </div>
                        <div id="payment">
                            <CreditScoreIcon className={paymentActive ? 'icons-active' : 'icons'} fontSize='large'/>
                            <p className={paymentActive ? 'menu-text-active' : 'menu-text'}>Pagamento</p>
                        </div>
                    </div>
                </div>
                {machineActive && !dataActive && <ChooseProduct isLoading={isLoadingReq} setUserError={setUserError} setMessage={setMessage} next={next} setQtd={setQtd} qtd={qtd} selectedCategory={selectedCategory} products={products} setProducts={setProducts} totalPrice={totalPrice} setTotalPrice={setTotalPrice} setChosenProducts={setChosenProducts} notProduct={notProduct} />}
                {dataActive && !summaryActive && <Data  error={error} next={next} setCep={setCep} setAddress={setAddress} setNumber={setNumber} setComplement={setComplement} setNeighborhood={setNeighborhood} setState={setState} setCity={setCity} qtd={qtd} cep={cep} address={address} number={number} complement={complement} neighborhood={neighborhood} state={state} city={city}/>}
                {summaryActive && !paymentActive && <Summary next={next} data={data} chooseProduct={chooseProduct} qtd={qtd} cep={cep} address={address} number={number} complement={complement} neighborhood={neighborhood} state={state} city={city} chosenProducts={chosenProducts} orderId={orderId} totalPrice={totalPrice} />}
                {paymentActive && <Payment orderId={orderId} products={products} totalPrice={totalPrice}/>}
            </div>
            </div>)}
        </div>
    )
}