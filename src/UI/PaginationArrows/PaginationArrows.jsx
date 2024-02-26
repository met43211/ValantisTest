import { useDispatch, useSelector } from "react-redux";
import styles from './PaginationArrows.module.scss'
import { useChangePage } from "../../hooks/useChangePage";
import { setPage, setStartIndex } from "../../redux/slices/products";

function PaginationArrows() {
    const page = useSelector(state => state.page)
    const isFilter = useSelector(state=>state.isFilter)
    const startIndex = useSelector(state=>state.startIndex)
    const IDs = useSelector(state=>state.IDs.items)
    const isLoading = useSelector(state => state.IDs.status === 'loading' || state.products.status === 'loading')
    const dispatch = useDispatch()

    const { nextPage, prevPage } = useChangePage()

    function nextPageFilter(){
        dispatch(setPage(page+1))
        dispatch(setStartIndex(startIndex+50))
    }
    function prevPageFilter(){
        dispatch(setPage(page-1))
        dispatch(setStartIndex(startIndex-50))
    }
    return ( 
        <div className={styles["arrows"]}>
            <button
                className={(page===1 || isLoading)?styles["disabled"]:''}
                onClick={!isFilter?prevPage:prevPageFilter}
                disabled={page===1 || isLoading}
            >
                Назад
            </button>
            <h3>{page}</h3>
            <button
                className={isLoading || isLoading || (isFilter&&IDs.slice(startIndex).length<50)?styles["disabled"]:''}
                onClick={!isFilter?nextPage:nextPageFilter}
                disabled={isLoading || (isFilter&&IDs.slice(startIndex).length<50)}
            >
                Вперед
            </button>
        </div>
     );
}

export default PaginationArrows;