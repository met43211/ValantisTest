import { useDispatch, useSelector } from "react-redux";
import { fetchIDs, setLimit, setPage, setStartIndex } from "../redux/slices/products";

export const useChangePage = ()=>{
    const dispatch = useDispatch()
    const startIndex = useSelector(state=>state.startIndex)
    const page = useSelector(state=>state.page)
    const pageError = useSelector(state=>state.pageError)
    const nextPage = ()=>{
        if(pageError[page+1]>=0){
            dispatch(setLimit(50+pageError[page+1]))
            dispatch(setStartIndex(startIndex + 50 + pageError[page])) //если мы уже были на следующей страницы, мы сразу берем столько индексов, чтобы при стирании одинаковых осталось ровно 50
        }
        else{
            dispatch(setLimit(50))
            dispatch(setStartIndex(startIndex +(pageError[page]>0?pageError[page]:50))) //если мы проходим первый раз, то мы идем на шаг 50 всегда
        }
        dispatch(setPage(page+1))
        dispatch(fetchIDs())
    }
    const prevPage = ()=>{
        const newLimit = 50 + (pageError[page-1])
        dispatch(setLimit(newLimit))
        dispatch(setStartIndex(startIndex-newLimit))
        dispatch(setPage(page-1))
        dispatch(fetchIDs())
    }
    return {nextPage, prevPage}
}