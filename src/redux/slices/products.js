import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchIDs = createAsyncThunk('products/fetchID', async(_, { getState })=>{
    const startIndex = getState().startIndex
    const limit = getState().limit
    const isFilter = getState().isFilter
    const filters = getState().filters
    const tabs = getState().tabs
    if(isFilter){
        const params = {}
        switch(tabs){
            case 'name':
                params.product = filters.name
                break
            case 'brand':
                params.brand = filters.brand
                break
            case 'price':
                params.price = Number(filters.price)
        }
        const {data} = await axios.post('', {
            action: "filter",
            params
        })
        return data.result
    }
    const {data} = await axios.post('', {
        action: "get_ids",
        params: {offset: startIndex, limit: limit}
    })
    return data.result
})
export const fetchProducts = createAsyncThunk('products/fetchProducts', async(_, { getState })=>{
    const IDs = getState().IDs.items
    const {data} = await axios.post('', {
        action: "get_items",
        params: {ids: IDs}
    })
    return data.result
})

export const initialState = {
    IDs: {
        items: [],
        status: '',
        error: null
    },
    products: {
        items: [],
        status: '',
        error: null
    },
    startIndex: 0,
    limit: 50,
    page: 1,
    pageError: {},
    isFilter: false,
    filters: {},
    tabs: 'name',
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setIDs: (state, action)=>{
            state.IDs.items = action.payload
        },
        setLimit: (state, action)=>{
            state.limit = action.payload
        },
        setStartIndex: (state, action)=>{
            state.startIndex = action.payload
        },
        setPage: (state, action) => {
            state.page = action.payload
        },
        setPageError: (state, action) => {
            state.pageError = action.payload
        },
        setIsFilter: (state, action) => {
            state.isFilter = action.payload
        },
        setFiltersValues: (state, action) => {
            state.filters = action.payload
        },
        setTabs: (state, action) => {
            state.tabs = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchIDs.pending, (state)=>{
                state.IDs.status = 'loading'
            })
            .addCase(fetchIDs.fulfilled, (state, action)=>{
                state.IDs.status = 'loaded'
                if(state.limit>=50){
                    state.IDs.items = []
                }
                state.IDs.items = [...state.IDs.items, ...action.payload]
                state.IDs.error = null
            })
            .addCase(fetchIDs.rejected, (state, action)=>{
                state.IDs.status = 'loading'
                state.IDs.items = []
                state.IDs.error = action.error
                console.log(action.error.message)
            })
            .addCase(fetchProducts.pending, (state)=>{
                state.products.status = 'loading'
            })
            .addCase(fetchProducts.fulfilled, (state, action)=>{
                state.products.status = 'loaded'
                state.products.items = action.payload
                state.products.error = null
            })
            .addCase(fetchProducts.rejected, (state, action)=>{
                state.products.status = 'loading'
                state.products.items = []
                state.products.error = action.error
                console.log(action.error.message)
            })
    }
})

export const ProductsReducer = productsSlice.reducer
export const { setIDs, setLimit, setStartIndex, setPage, setPageError, setIsFilter, setFiltersValues, setTabs } = productsSlice.actions