import Axios from 'axios';
import { GET_DATA_MEMBERS, START_GET_MEMBERS, END_GET_MEMBERS } from './types';
const API_URL = process.env.REACT_APP_API_URL;

export const getDataMembers = (page, size) => {
    return async (dispatch) => {
        try {
            dispatch({ type : START_GET_MEMBERS })
            const query = `/api/users?page=${page}&size=${size}`;
            const respond = await Axios.get(API_URL + query);
            dispatch({ type : GET_DATA_MEMBERS, payload : respond.data.data });
            dispatch({ type : END_GET_MEMBERS });
        } catch (error) {
            dispatch({ type : END_GET_MEMBERS });
            console.log(error);
        }
    }
}