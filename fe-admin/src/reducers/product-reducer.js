import { GET_PRODUCTS, START_PRODUCTS,END_PRODUCTS } from "../actions/types";

const INITIAL_STATE = {
    loading : false,
    data : []
}

const ProductReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case START_PRODUCTS :
            return { ...state, loading : true}
        case END_PRODUCTS : 
            return { ...state, loading : false} 
        case GET_PRODUCTS :
            return {...state, data : action.payload.data}
        default :
            return state
    }
}

export default ProductReducer