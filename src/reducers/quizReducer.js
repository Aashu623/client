import {
    LOAD_QUIZ_REQUEST,
    LOAD_QUIZ_SUCCESS,
    LOAD_QUIZ_FAIL,
    CLEAR_ERRORS
} from '../constants/quizConstants.js';

export const quizReducer = (state = { }, action) => {
    switch (action.type) {
        case LOAD_QUIZ_REQUEST:
            return {
                loading: true,
            };
        case LOAD_QUIZ_SUCCESS:

            return {
                loading: false,
                quiz: action.payload
            }
        case LOAD_QUIZ_FAIL:
            return {
                loading: false,
                quiz: null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}