import styles from './ProductsCard.module.scss'

function ProductsCard({brand,  id, price, product}) {
    return ( 
        <div className={styles["card"]}>
            <h2>{product}</h2>
            <h3>{price}р</h3>
            {brand&&<p>{brand}</p>}
        </div>
     );
}

export default ProductsCard;