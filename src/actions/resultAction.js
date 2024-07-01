import {
    SUBMIT_RESULT_REQUEST,
    SUBMIT_RESULT_SUCCESS,
    SUBMIT_RESULT_FAIL,
    ALL_RESULT_REQUEST,
    ALL_RESULT_SUCCESS,
    ALL_RESULT_FAIL,
    CLEAR_ERRORS
} from '../constants/resultConstants.js';
import axios from 'axios';
axios.defaults.withCredentials = true;


// SUBMIT RESULT
export const submitResult = (resultArray, quiz, user) => async (dispatch) => {
    try {
        dispatch({ type: SUBMIT_RESULT_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(
            `/api/v1/result/submit`,
            { resultArray, quiz, user },
            config
        );

        dispatch({ type: SUBMIT_RESULT_SUCCESS, payload: data.score });
    } catch (error) {
        dispatch({ type: SUBMIT_RESULT_FAIL, payload: error.response.data.message });
    }
};
export const getAllResults = () => async (dispatch) => {
    
    try {
        dispatch({ type: ALL_RESULT_REQUEST });

        const { data } = await axios.get(`/api/v1/results`,);

        console.log(data)
        dispatch({ type: ALL_RESULT_SUCCESS, payload: data.results });
    } catch (error) {
        dispatch({ type: ALL_RESULT_FAIL, payload: error.response.data.message });
    }
};


//CLEAR ERRORS
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}