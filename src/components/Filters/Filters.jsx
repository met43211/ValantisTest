import { useState } from 'react';
import Input from '../../UI/Input/Input';
import styles from './Filters.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { fetchIDs, setFiltersValues, setIsFilter, setLimit, setStartIndex, setTabs } from '../../redux/slices/products';

function Filters() {
    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [price, setPrice] = useState()
    const dispatch = useDispatch()
    const tabs = useSelector(state=>state.tabs)

    function setFilters(){
        dispatch(setIsFilter(true))
        dispatch(setStartIndex(0))
        dispatch(setLimit(50))
        dispatch(setFiltersValues({
            name,
            brand,
            price: price?price:null
        }))
        dispatch(fetchIDs())
    }

    function resetFilters(){
        setName('')
        setBrand('')
        setPrice('')
        dispatch(setIsFilter(false))
        dispatch(fetchIDs())
    }

    function setTabsValue(value){
        dispatch(setTabs(value))
    }

    return ( 
        <div className={styles["filters"]}>
            <h2>Фильтры</h2>
            <div className={styles["tabs"]}>
                <button onClick={()=>{setTabsValue('name')}} className={tabs==='name'&&styles['active']}>Названиен</button>
                <button onClick={()=>{setTabsValue('brand')}} className={tabs==='brand'&&styles['active']}>Брэнд</button>
                <button onClick={()=>{setTabsValue('price')}} className={tabs==='price'&&styles['active']}>Цена</button>
            </div>
            <div className={styles["inputs"]}>
                {tabs==='name'&&<Input
                    placeholder={'Введите название товара'}
                    type={'text'}
                    value={name}
                    setValue={setName}
                />}

                {tabs==='brand'&&<Input
                    placeholder={'Введите название бренда'}
                    type={'text'}
                    value={brand}
                    setValue={setBrand}
                />}
                
                {tabs==='price'&&<Input
                    placeholder={'Введите цену'}
                    type={'number'}
                    value={price}
                    setValue={setPrice}
                />}
            </div>
            <button onClick={setFilters}>Применить</button>
            <button onClick={resetFilters} className={styles["reset"]}>Сбросить</button>
        </div>
     );
}

export default Filters;