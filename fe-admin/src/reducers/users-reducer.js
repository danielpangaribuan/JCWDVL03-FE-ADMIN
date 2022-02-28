import { GET_DATA_USERS, START_GET_USERS, END_GET_USERS } from '../actions/types';

const INITIAL_STATE = {
    data : [],
    loading: false
}

function userReducer (state = INITIAL_STATE, action) {
    switch(action.type) {
        case GET_DATA_USERS :
            return { ...state, data : action.payload }
        case START_GET_USERS :
            return { ...state, loading: true }
        case END_GET_USERS :
            return { ...state, loading: false }
        default :
            return state
    }
}

export default userReducer;