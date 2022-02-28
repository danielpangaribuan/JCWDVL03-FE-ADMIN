import { GET_COMBO_STATUS_TRANSACTION } from '../actions/types';

const INITIAL_STATE = {
    data: []
}

function transactionStatusCombo (state = INITIAL_STATE, action) {
    switch(action.type) {
        case GET_COMBO_STATUS_TRANSACTION :
            return { ...state, data: action.payload }
        default :
            return state
    }
}

export default transactionStatusCombo;