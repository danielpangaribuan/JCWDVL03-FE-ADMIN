import { GET_LOCATION } from "../actions/types";

const INITIAL_STATE = {
    data: []
}

function location (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_LOCATION:
            return { ...state, data: action.payload }
        default:
            return state
    }
}

export default location;