import { GET_SALES_PRODUCT } from '../actions/types';

const INITIAL_STATE = {
    totalData: []
}

function getProductSales (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_SALES_PRODUCT :
            return { ...state, totalData: action.payload }
        default :
            return state
    }
}

export default getProductSales;