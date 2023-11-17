/**
 * Component that renders the chosen products cards with their information in the summary page
 * @param chooseProduct: function that redirects the user to the page where he can choose the products
 * @param qtd: array that stores the quantity of each product
 * @param chosenProducts: array that stores the chosen products
 */
export default function ProductCardSummary({ chooseProduct, qtd, chosenProducts }) {
    return (
        /**
         * For each chosen product, render the product card with its information
         */
    // eslint-disable-next-line array-callback-return
    chosenProducts.map((product, index) => {
            const description = chosenProducts[index].description.split(';');
            if (qtd[index] !== 0) { 
            return (
            <div className='products'>
                    <div className='product'>
                        <div>
                            <img className='product-img' id="summary-img" src={chosenProducts[index].image} alt="maquininha"/>
                        </div>
                        <div className='info'>
                            <h3 style={{ fontSize: "18px", fontWeight: "700", margin: "0"}}>{chosenProducts[index].name}</h3>
                            {description.map((item) => {
                            return (
                                <p className='info-text'>{item}</p>
                            )
                            })}
                            <p className='info-text' style={{ fontWeight: "bold", color: "black"}}> Quantidade: {qtd[index]} </p>
                        </div>
                    </div>
                    <div className='price'>
                        <div>
                            <p id="installments">12x de R$ {(chosenProducts[index].price / 12).toFixed(2)} </p>
                            <p id="p-price">ou R$ {(chosenProducts[index].price).toFixed(2)} à vista</p>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row-reverse", padding: "3px" }}>
                        <p onClick={chooseProduct} style={{ fontSize: "14px", textDecoration: "underline", fontWeight: "bold", cursor: "pointer" }}>Editar</p>
                    </div> 
            </div>
            )
        }
    })
    )
}