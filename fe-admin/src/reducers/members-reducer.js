import { GET_DATA_MEMBERS, START_GET_MEMBERS, END_GET_MEMBERS } from '../actions/types';

const INITIAL_STATE = {
    data : [],
    loading: false
}

function membersReducer (state = INITIAL_STATE, action) {
    switch(action.type) {
        case GET_DATA_MEMBERS :
            return { ...state, data : action.payload }
        case START_GET_MEMBERS :
            return { ...state, loading: true }
        case END_GET_MEMBERS :
            return { ...state, loading: false }
        default:
            return state
    }
}

export default membersReducer;