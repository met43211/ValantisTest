import { useDispatch, useSelector } from 'react-redux';
import { fetchIDs, fetchProducts, setIDs, setLimit, setPageError, setStartIndex } from '../redux/slices/products';

export const useCountIds = ()=>{
    const dispatch = useDispatch()
    const IDs = useSelector(state=>state.IDs)
    const startIndex = useSelector(state=>state.startIndex)
    const limit = useSelector(state=>state.limit)
    const page = useSelector(state=>state.page)
    const pageError = useSelector(state=>state.pageError)

    const count = ()=>{
        if(IDs.items.length>=50){
            const normolizeIDs = []
            const usedKeys = {}
            IDs.items.forEach(id => {
                if (!usedKeys[id]) {
                  normolizeIDs.push(id);
                  usedKeys[id] = true;
                }
              })
            if(normolizeIDs.length<50){
                dispatch(setIDs(normolizeIDs))
                if(pageError[page+1]===undefined){
                    dispatch(setPageError( //если мы не были на следующей странице, то высчитываем погрешность индексов на этой
                        {...pageError,
                        [page]: pageError[page]>0?pageError[page]+(50-normolizeIDs.length):50-normolizeIDs.length}
                    ))
                }
                dispatch(setStartIndex(startIndex+limit))
                dispatch(setLimit(50-normolizeIDs.length))
                dispatch(fetchIDs())
            }
            else{
                dispatch(setPageError(
                    {...pageError,
                    [page]: pageError[page]!=undefined?pageError[page]:0} //присваеваем данной странице колличство индексов, который нужно взять с запасом, чтобы при удалении одинаковых осталось ровно 50
                ))
                dispatch(fetchProducts())
            }
        }else{
            dispatch(setPageError(
                {...pageError,
                [page]: pageError[page]!=undefined?pageError[page]:0} //если это последняя страница
            ))
            dispatch(fetchProducts())
        }
    }
    return {count}
}