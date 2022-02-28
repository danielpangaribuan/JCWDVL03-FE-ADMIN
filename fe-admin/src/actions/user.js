import Axios from 'axios';
import { GET_DATA_USERS, START_GET_USERS, END_GET_USERS } from './types';
const API_URL = process.env.REACT_APP_API_URL;

export const getDataUsers = (page, size, role) => {
    return async (dispatch) => {
        try {
            dispatch({ type : START_GET_USERS })
            const query = `/users?page=${page}&size=${size}&role=${role}`;
            const respond = await Axios.get(API_URL + query);
            dispatch({ type : GET_DATA_USERS, payload : respond.data.data });
            dispatch({ type : END_GET_USERS });
        } catch (error) {
            dispatch({ type : END_GET_USERS });
            console.log(error);
        }
    }
}