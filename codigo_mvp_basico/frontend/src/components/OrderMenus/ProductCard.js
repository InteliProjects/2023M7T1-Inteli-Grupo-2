import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

/**
 * Component that renders the product card with its information
 * @param addQtd: function that adds one to the quantity of the product
 * @param removeQtd: function that removes one to the quantity of the product
 * @param qtd: the quantity of the product
 * @param product: the product
 * @returns the product card with its information
 */
export default function ProductCard({ addQtd, removeQtd, qtd, product }) {
    // Destructuring the product
    const name = product.name;
    const price = product.price;
    // Remove the brackets and split the description by the semicolon
    const description = product.description.split(';');
    const url = product.image;

    return (
        <div className='products'>
            <div className='product'>
                <div>
                    <img className='product-img' src={url} alt="maquininha-1"/>
                </div>
                    <div className='info'>
                        <h3 style={{ fontSize: "18px", fontWeight: "700", margin: "0"}}>{name}</h3>
                        {description.map((item) => {
                        return (
                            <p className='info-text'>{item}</p>
                        )
                        })}
                    </div>
            </div>
            <div className='price'>
                <div>
                    <p id="installments">12x de R$ {(price/12).toFixed(2)} </p>
                    <p id="p-price">ou R$ {price.toFixed(2)} à vista</p>
                </div>
                <div className='quantity-box'>
                    <RemoveIcon style={{ cursor: "pointer" }} onClick={() => removeQtd(product.id)}/>
                    <p className='qtd-elements'> {qtd} </p>
                    <AddIcon style={{ cursor: "pointer" }} onClick={() => addQtd(product.id)}/>
                </div>
            </div>
        </div>
    )
}