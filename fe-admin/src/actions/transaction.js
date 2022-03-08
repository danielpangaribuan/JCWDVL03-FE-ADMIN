import Axios from 'axios';
import { START_GET_TRANSACTIONS, GET_DATA_TRANSACTIONS, END_GET_TRANSACTIONS, START_DETAIL_TRANSACTION, GET_DETAIL_TRANSACTION, END_DETAIL_TRANSACTION, START_UPDATE_STATUS_TRANSACTION, UPDATE_STATUS_TRANSACTION, END_UPDATE_STATUS_TRANSACTION, GET_COMBO_STATUS_TRANSACTION } from './types';
const API_URL = process.env.REACT_APP_API_URL;

export const getDataTransactions = (id_transacion, created_from, created_end, fullname, status) => {
    return async (dispatch) => {
        try {
            dispatch({ type: START_GET_TRANSACTIONS });
            const params = { id_transacion, created_from, created_end, fullname, status }
            const query = `/transactions`;
            const respond = await Axios.get(API_URL + query, { params } );

            dispatch({ type: GET_DATA_TRANSACTIONS, payload: respond.data.data });
            dispatch({ type: END_GET_TRANSACTIONS})
        } catch (error) {
            dispatch({ type: END_GET_TRANSACTIONS });
            console.log(error);
        }
    }
}

export const getDetailTransactions = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: START_DETAIL_TRANSACTION });
            const query = `/transactions/${id}`;
            const respond = await Axios.get(API_URL + query);
            dispatch({ type: GET_DETAIL_TRANSACTION, payload: respond.data.data[0] });
            dispatch({ type: END_DETAIL_TRANSACTION });
        } catch (error) {
            dispatch({ type: END_DETAIL_TRANSACTION });
            console.log(error);
        }
    }
}

export const updateStatusTransaction = (id, status_id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: START_UPDATE_STATUS_TRANSACTION });
            const query = `/transactions/${id}`;
            const params = { status_id }
            const respond = await Axios.patch(API_URL + query, params);
            dispatch({ type: UPDATE_STATUS_TRANSACTION, payload: respond.data.data });
            dispatch({ type: END_UPDATE_STATUS_TRANSACTION });
        } catch (error) {
            dispatch({ type: END_UPDATE_STATUS_TRANSACTION })
            console.log(error)
        }
    }
}

export const comboStatusTransaction = () => {
    return async (dispatch) => {
        try {
            const query = '/combo_status_transaction';
            const respond = await Axios.get(API_URL + query);
            dispatch({ type: GET_COMBO_STATUS_TRANSACTION, payload: respond.data.data });
        } catch (error) {
            console.log(error);
        }
    }
}