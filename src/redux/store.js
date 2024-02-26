import { configureStore } from "@reduxjs/toolkit"
import { ProductsReducer } from "./slices/products"

const setupStore = ()=>{
    return configureStore({
        reducer: ProductsReducer,
    })
}
export default setupStore