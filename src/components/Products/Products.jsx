import { useSelector } from 'react-redux';
import styles from './Products.module.scss'
import LoadingBar from '../../UI/LoadingBar/LoadingBar';
import ProductsCard from './ProductsCard';
import { useFilterProducts } from '../../hooks/useFilterProducts';

function Products() {
    const products = useSelector(state=>state.products)
    const IDs = useSelector(state=>state.IDs)
    const isFilter = useSelector(state=>state.isFilter)
    const startIndex = useSelector(state=>state.startIndex)

    switch(products.status||IDs.status){
        case 'loading':
            return  <LoadingBar/>
        case 'error':
            return <h1>Ошибка сервера</h1>
        case 'loaded':
            const normalizeProducts = useFilterProducts(products.items)
            return (
                <div className={styles["products"]}>
                    {!isFilter?normalizeProducts.map(item=>
                        <ProductsCard
                            key={item.id}
                            brand={item.brand} 
                            id={item.id}
                            price={item.price}
                            product={item.product}
                        />
                    ):
                    normalizeProducts.slice(startIndex, startIndex+50).map(item=>
                        <ProductsCard
                            key={item.id}
                            brand={item.brand} 
                            id={item.id}
                            price={item.price}
                            product={item.product}
                        />
                    )
                    }
                </div>
            )
    }
}

export default Products;