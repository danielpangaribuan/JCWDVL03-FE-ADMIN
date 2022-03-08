import { START_GET_TOTAL_DATA, GET_TOTAL_DATA, END_GET_TOTAL_DATA, GET_INCOME_STATEMENT } from '../actions/types';

const INITIAL_STATE = {
    data: [],
    data_income: [],
    loading: false
}

function getTotalData (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_TOTAL_DATA :
            return { ...state, data: action.payload }
        case START_GET_TOTAL_DATA :
            return { ...state, loading: true }
        case END_GET_TOTAL_DATA :
            return { ...state, loading: false }

        case GET_INCOME_STATEMENT :
            return { ...state, data_income: action.payload }

        default :
            return state
    }
}

export default getTotalData;