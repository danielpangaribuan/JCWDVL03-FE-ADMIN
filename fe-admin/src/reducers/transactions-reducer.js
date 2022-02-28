import { START_GET_TRANSACTIONS, GET_DATA_TRANSACTIONS, END_GET_TRANSACTIONS } from '../actions/types';

const INITIAL_STATE = {
    data: [],
    loading: false
}

function transactionReducer (state = INITIAL_STATE, action) {
    switch(action.type) {
        case GET_DATA_TRANSACTIONS :
            return { ...state, data : action.payload }
        case START_GET_TRANSACTIONS :
            return { ...state, loading: true }
        case END_GET_TRANSACTIONS :
            return { ...state, loading: false }
        default :
            return state
    }
}

export default transactionReducer;