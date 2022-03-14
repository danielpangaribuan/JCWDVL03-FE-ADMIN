import axios, { Axios } from "axios";
import { GET_PRODUCTS, START_PRODUCTS, END_PRODUCTS } from "./types";

const API_URL = process.env.REACT_APP_API_URL;


export const getAllProducts = () => {
    return async (dispatch) => {
        try {
            dispatch({ type : START_PRODUCTS})

            const {data} = await axios.get(API_URL + '/products')
            dispatch({type : GET_PRODUCTS, payload : data })

            dispatch({type: END_PRODUCTS})
        } catch ({ respond }) {
            dispatch({type : END_PRODUCTS})
            console.log(respond && respond.data)
        }
    }
}

export const addNewProduct = (body) => {
    return async (dispatch) => {
        try {
            dispatch({ type : START_PRODUCTS})

            const respond = await axios.post(API_URL + '/products', body)
            console.log(respond.data)

            const { data } = await axios.get(API_URL + '/products')
            dispatch({type : GET_PRODUCTS, payload : data })
            
            dispatch({type : END_PRODUCTS})
        } catch ({ respond }) {
            dispatch({type : END_PRODUCTS})
            console.log(respond && respond.data)
        }
    }
}

export const deleteProduct = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type : START_PRODUCTS})

            const respond = await axios.delete(API_URL + `/products/${id}`)
            console.log(respond.data)

            const { data } = await axios.get(API_URL + '/products')
            dispatch({type : GET_PRODUCTS, payload : data })
            
            dispatch({type : END_PRODUCTS})
        } catch ({ respond }) {
            dispatch({type : END_PRODUCTS})
            console.log(respond && respond.data)
        }
    }
}