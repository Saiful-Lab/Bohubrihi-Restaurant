import COMMENTS from "../data/comments";
import { combineReducers } from "redux";
import * as actionType from './actionType.js';
import { initialContactForm } from "./forms";
import { createForms } from "react-redux-form";

const dishReducer = (dishState = {isLoading: false, dishes: []}, action) => {
    switch(action.type) {
        case actionType.DISHES_LOADING:
            return {
                ...dishState,
                isLoading: true,
                dishes: []
            }

        case actionType.LOAD_DISH:
            return {
                ...dishState,
                isLoading: false,
                dishes: action.payload
            }

        default:
            return dishState
    }
}

const commentReducer = (commentState = COMMENTS, action) => {
    switch (action.type) {
        case actionType.ADD_COMMENT:
            let comment = action.payload;
            comment.date = new Date().toDateString();
            comment.id = commentState.length
            return commentState.concat(comment)
    
        default:
            return commentState
    }
}

export const reducer = combineReducers({
    dishes: dishReducer,
    comments: commentReducer,
    ...createForms({
        feedback: initialContactForm
    })
})