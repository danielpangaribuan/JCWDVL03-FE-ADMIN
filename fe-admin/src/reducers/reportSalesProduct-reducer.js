import { GET_SALES_PRODUCT } from '../actions/types';

const INITIAL_STATE = {
    data: []
}

function getProductSales (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_SALES_PRODUCT :
            return { ...state, data: action.payload }
        default :
            return state
    }
}

export default getProductSales;