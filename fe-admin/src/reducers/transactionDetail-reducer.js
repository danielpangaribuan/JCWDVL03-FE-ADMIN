import { START_DETAIL_TRANSACTION, GET_DETAIL_TRANSACTION, END_DETAIL_TRANSACTION } from '../actions/types';

const INITIAL_STATE = {
    data : [],
    loading: false
}

function transactionDetailReducer (state = INITIAL_STATE, action) {
    switch(action.type) {
        case GET_DETAIL_TRANSACTION :
            return { ...state, data: action.payload }
        case START_DETAIL_TRANSACTION :
            return { ...state, loading: true }
        case END_DETAIL_TRANSACTION :
            return { ...state, loading: false }
        default :
            return state
    }
}

export default transactionDetailReducer;