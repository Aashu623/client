import {
    LOAD_QUIZ_REQUEST,
    LOAD_QUIZ_SUCCESS,
    LOAD_QUIZ_FAIL,
} from '../constants/quizConstants.js';
import axios from 'axios';






//LOAD QUIZ
export const loadQuiz = (quizId) => async (dispatch) => {
    try {
        dispatch({ type: LOAD_QUIZ_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(`/api/v1/quiz`, { quizId }, config);

        dispatch({ type: LOAD_QUIZ_SUCCESS, payload: data.quiz });
    } catch (error) {
        dispatch({ type: LOAD_QUIZ_FAIL, payload: error.response.data.message });
    }
};


// //LOGOUT USER
// export const logout = () => async (dispatch) => {
//     try {

//         await axios.get(`/api/v1/logout`);

//         dispatch({ type: LOGOUT_SUCCESS });
//     } catch (error) {
//         dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
//     }
// };


// //GET ALL USERS --ADMIN
// export const getAllUsers = () => async (dispatch) => {
//     try {
//         dispatch({ type: ALL_USER_REQUEST });

//         const { data } = await axios.get(`/api/v1/admin/users`);

//         dispatch({ type: ALL_USER_SUCCESS, payload: data.users });
//     } catch (error) {
//         dispatch({ type: ALL_USER_FAIL, payload: error.response.data.message });
//     }
// };



// //DELETE USER --ADMIN
// export const deleteUser = (id) => async (dispatch) => {
//     try {
//         dispatch({ type: DELETE_USER_REQUEST });

//         const { data } = await axios.delete(
//             `/api/v1/admin/user/${id}`
//         );

//         dispatch({ type: DELETE_USER_SUCCESS, payload: data });
//     } catch (error) {
//         dispatch({ type: DELETE_USER_FAIL, payload: error.response.data.message });
//     }
// };

// //CLEAR ERRORS
// export const clearErrors = () => async (dispatch) => {
//     dispatch({ type: CLEAR_ERRORS })
// }