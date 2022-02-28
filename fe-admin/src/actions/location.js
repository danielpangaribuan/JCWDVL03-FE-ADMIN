import Axios from 'axios';
import { GET_LOCATION } from './types';

const API_LOCATION = 'https://api.binderbyte.com/wilayah/provinsi?api_key=08d9bea0061726f6731cda7ce6818a4543b651bd264ccd19e95d504c77aa1664';

export const getLocation = () => {
    return async (dispatch) => {
        try {
            const respond = await Axios.get(API_LOCATION);
            dispatch({ type: GET_LOCATION, payload: respond.data.value });
        } catch (error) {
            console.log(error);
        }
    }
}