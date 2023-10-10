import React, {useReducer} from 'react'
import {
    ADD_TODO,
    DELETE_TODO,
    EDIT_TODO,
    SAVE_TODO,
    UPDATE_EDITED_TODO,
    UPDATE_NEW_TODO,
} from "../actiontypes";

export const TodoContext = React.createContext()

const initialState = {
    todos: [],
    newTodo: "",
    editingTodo: null,
    editedTodo: "",
};

function reducer(state, action) {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload],
                newTodo: "",
            };
        case DELETE_TODO:
            return {
                ...state,
                todos: [
                    ...state.todos.slice(0, action.payload),
                    ...state.todos.slice(action.payload + 1),
                ],
            };
        case EDIT_TODO:
            return {
                ...state,
                editingTodo: action.payload,
                editedTodo: state.todos[action.payload],
            };
        case SAVE_TODO:
            return {
                ...state,
                todos: [
                    ...state.todos.slice(0, state.editingTodo),
                    state.editedTodo,
                    ...state.todos.slice(state.editingTodo + 1),
                ],
                editingTodo: null,
                editedTodo: "",
            };
            
        case UPDATE_NEW_TODO:
            return { ...state, newTodo: action.payload };
        case UPDATE_EDITED_TODO:
            return { ...state, editedTodo: action.payload };

        default:
            throw new Error();
    }
}

export default function ContextProvider({children}) {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TodoContext.Provider value={{
        state,
        dispatch
    }}>
        {children}
    </TodoContext.Provider>
  )
}
