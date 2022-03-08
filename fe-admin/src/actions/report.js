import Axios from 'axios';
import { START_GET_TOTAL_DATA, GET_TOTAL_DATA, END_GET_TOTAL_DATA, GET_SALES_PRODUCT, GET_INCOME_STATEMENT } from './types';
const API_URL = process.env.REACT_APP_API_URL;

export const getTotalData = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: START_GET_TOTAL_DATA });
            const query = `/reportTotalData`;
            const respond = await Axios.get(API_URL + query);
            
            dispatch({ type: GET_TOTAL_DATA, payload: respond.data.data[0] });
            dispatch({ type: END_GET_TOTAL_DATA });
        } catch(error) {
            dispatch({ type: END_GET_TOTAL_DATA });
            console.log(error);
        }
    }
}

export const getSalesProduct = () => {
    return async (dispatch) => {
        try {
            const query = `/reportProductSales`;
            const respond = await Axios.get(API_URL + query);

            dispatch({ type: GET_SALES_PRODUCT, payload: respond.data.data });
        } catch (error) {
            console.log(error);
        }
    }
}

export const reportIncomeStatement = () => {
    return async (dispatch) => {
        try {
            const query = `/reportIncomeStatement`;
            const respond = await Axios.get(API_URL + query);

            dispatch({ type: GET_INCOME_STATEMENT, payload: respond.data.data });
        } catch (error) {
            console.log(error);
        }
    }
}