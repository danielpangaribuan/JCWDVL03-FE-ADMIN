import { START_UPDATE_STATUS_TRANSACTION, UPDATE_STATUS_TRANSACTION, END_UPDATE_STATUS_TRANSACTION } from '../actions/types';

const INITIAL_STATE = {
    msg: "",
    loading: false
}

function transactionUpdateStatus (state = INITIAL_STATE, action) {
    switch(action.type) {
        case UPDATE_STATUS_TRANSACTION :
            return { ...state, msg: action.payload }
        case START_UPDATE_STATUS_TRANSACTION :
            return { ...state, loading: true }
        case END_UPDATE_STATUS_TRANSACTION :
            return { ...state, loading: false, msg: "UPDATED" }
        default:
            return state
    }
}

export default transactionUpdateStatus;