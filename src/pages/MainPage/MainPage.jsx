import { useEffect } from 'react';
import styles from './MainPage.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { fetchIDs, fetchProducts } from '../../redux/slices/products';
import Products from '../../components/Products/Products';
import PaginationArrows from '../../UI/PaginationArrows/PaginationArrows';
import { useCountIds } from '../../hooks/useCountIds';
import Filters from '../../components/Filters/Filters';

function MainPage() {
    const dispatch = useDispatch()
    const IDs = useSelector(state=>state.IDs)
    const products = useSelector(state=>state.products)
    const {count} = useCountIds()

    useEffect(()=>{
        dispatch(fetchIDs())
    }, [])

    useEffect(()=>{
        if(IDs.status==='loaded'){
            count()     //эта функция нужна чтобы отсеивать повторяющтеся индексы. они есть в первых 50, поэтому предполагается, что могут встретиться еще
        }
        else if(IDs.error){
            setTimeout(async()=>{
                dispatch(fetchIDs())
            }, 3000)
        }
    }, [IDs])

    useEffect(()=>{
        if(products.error){ 
            dispatch(fetchProducts())
        }
    }, [products])

    
    return ( 
        <div className={styles.wrapper}>
            <div className={styles["main"]}>
                <div>
                    <h1>Товары</h1>
                    <Filters/>
                    <PaginationArrows/>
                </div>
                <Products/>
                <PaginationArrows/>
            </div>
        </div>
     );
}

export default MainPage;