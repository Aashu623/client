import {
    SUBMIT_RESULT_REQUEST,
    SUBMIT_RESULT_SUCCESS,
    SUBMIT_RESULT_FAIL,
} from '../constants/resultConstants.js';
import axios from 'axios';

// REGISTER
export const submitResult = (resultArray, quizId, userId) => async (dispatch) => {
    try {
        dispatch({ type: SUBMIT_RESULT_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(
            `/api/v1/result/submit`,
            { resultArray, quizId, userId },
            config
        );

        dispatch({ type: SUBMIT_RESULT_SUCCESS, payload: data.score });
    } catch (error) {
        dispatch({ type: SUBMIT_RESULT_FAIL, payload: error.response.data.message });
    }
};