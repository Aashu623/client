import {
    SUBMIT_RESULT_REQUEST,
    SUBMIT_RESULT_SUCCESS,
    SUBMIT_RESULT_FAIL,
    ALL_RESULT_REQUEST,
    ALL_RESULT_SUCCESS,
    ALL_RESULT_FAIL,
    CLEAR_ERRORS
} from '../constants/resultConstants.js';

export const resultReducer = (state = {}, action) => {
    switch (action.type) {
        case SUBMIT_RESULT_REQUEST:
            return {
                loading: true,
            };

        case SUBMIT_RESULT_SUCCESS:
            return {
                loading: false,
                score: action.payload
            }
        case SUBMIT_RESULT_FAIL:
            return {
                loading: false,
                error: action.payload
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const allResultReducer = (state = { results: [] }, action) => {
    switch (action.type) {
        case ALL_RESULT_REQUEST:
            return {
                loading: true,
            };

        case ALL_RESULT_SUCCESS:
            return {
                loading: false,
                results: action.payload
            }
        case ALL_RESULT_FAIL:
            return {
                loading: false,
                error: action.payload
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}



