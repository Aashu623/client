import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension';
import { userReducer } from './reducers/userReducer';
import { quizReducer } from './reducers/quizReducer';
import { allResultReducer, resultReducer } from './reducers/resultReducer';
const reducer = combineReducers({
    user: userReducer,
    quiz: quizReducer,
    result: resultReducer,
    allResults: allResultReducer,
});

let initialState = {
    quiz: {
        quiz: localStorage.getItem("quiz")
            ? JSON.parse(localStorage.getItem("quiz"))
            : {},
    }
};
const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;