import Axios from 'axios';
import { START_GET_TOTAL_DATA, 
        GET_TOTAL_DATA, 
        END_GET_TOTAL_DATA, 
        GET_SALES_PRODUCT, 
        GET_INCOME_STATEMENT,
        GET_NUMBER_OF_SALES,
        GET_REPORT_CHURN,
        GET_REPORT_COST } from './types';
const API_URL = process.env.REACT_APP_API_URL;

export const getTotalData = (startDate, endDate) => {
    return async (dispatch) => {
        try {
            const params = { start_date: startDate, end_date: endDate}
            dispatch({ type: START_GET_TOTAL_DATA });
            const query = `/reportTotalData`;
            const respond = await Axios.get(API_URL + query, { params });
            
            dispatch({ type: GET_TOTAL_DATA, payload: respond.data.data[0] });
            dispatch({ type: END_GET_TOTAL_DATA });
        } catch(error) {
            dispatch({ type: END_GET_TOTAL_DATA });
            console.log(error);
        }
    }
}

export const getSalesProduct = (startDate, endDate) => {
    return async (dispatch) => {
        try {
            const params = { start_date: startDate, end_date: endDate}
            const query = `/reportProductSales`;
            const respond = await Axios.get(API_URL + query, { params });

            dispatch({ type: GET_SALES_PRODUCT, payload: respond.data.data });
        } catch (error) {
            console.log(error);
        }
    }
}

export const reportIncomeStatement = (startDate, endDate) => {
    return async (dispatch) => {
        try {
            const params = { start_date: startDate, end_date: endDate }
            const query = `/reportIncomeStatement`;
            const respond = await Axios.get(API_URL + query, { params });

            dispatch({ type: GET_INCOME_STATEMENT, payload: respond.data.data });
        } catch (error) {
            console.log(error);
        }
    }
}

export const getNumberOfSales = (startDate, endDate) => {
    return async (dispatch) => {
        try {
            const params = { start_date: startDate, end_date: endDate }
            const query = '/numberOfSales';
            const respond = await Axios.get(API_URL + query, { params });
            dispatch({ type: GET_NUMBER_OF_SALES, payload: respond.data.data });
        } catch (error) {
            console.log(error);
        }
    }
}

export const getReportCost = (startDate, endDate) => {
    return async (dispatch) => {
        try {
            const params = { start_date: startDate, end_date: endDate };
            const query = '/getCostReport';
            const respond = await Axios.get(API_URL + query, { params });
            dispatch({ type: GET_REPORT_COST, payload: respond.data.data });
        } catch (error) {
            console.log(error);
        }
    }
}

export const getReportChurn = (startDate, endDate) => {
    return async (dispatch) => {
        try {
            const params = { start_date: startDate, end_date: endDate };
            const query = '/reportChurn';
            const respond = await Axios.get(API_URL + query, { params });
            dispatch({ type: GET_REPORT_CHURN, payload: respond.data.data });
        } catch (error) {
            console.log(error);
        }
    }
}