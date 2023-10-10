import React, { useContext } from "react";
import { TodoContext } from '../context/TodoProvider'
import {
    ADD_TODO,
    DELETE_TODO,
    EDIT_TODO,
    SAVE_TODO,
    UPDATE_EDITED_TODO,
    UPDATE_NEW_TODO,
} from "../actiontypes";

function TodoList() {

    const { state, dispatch } = useContext(TodoContext)

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({ type: ADD_TODO, payload: state.newTodo });
    };

    return (
        <div>
            <h1>ToDo-Liste</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="newTodoInput">Neues Todo hinzufügen</label>
                <br />
                <input
                    id="newTodoInput"
                    type="text"
                    placeholder="Neues Todo hinzufügen"
                    value={state.newTodo}
                    onChange={(event) =>
                        dispatch({
                            type: UPDATE_NEW_TODO,
                            payload: event.target.value,
                        })
                    }
                />
                <button type="submit">Hinzufügen</button>
            </form>
            
            <ul>
                {state.todos.map((todo, index) => (
                    <li key={index}>
                        {state.editingTodo === index ? (
                            <>
                                <input
                                    type="text"
                                    placeholder="Todo bearbeiten"
                                    value={state.editedTodo}
                                    onChange={(event) =>
                                        dispatch({
                                            type: UPDATE_EDITED_TODO,
                                            payload: event.target.value,
                                        })
                                    }
                                />{" "}
                                <button
                                    onClick={() => {
                                        dispatch({ type: SAVE_TODO });
                                    }}
                                >
                                    Speichern
                                </button>
                            </>
                        ) : (
                            <>
                                {todo}{" "}
                                <button
                                    onClick={() =>
                                        dispatch({
                                            type: DELETE_TODO,
                                            payload: index,
                                        })
                                    }
                                >
                                    Löschen
                                </button>
                                <button
                                    onClick={() =>
                                        dispatch({
                                            type: EDIT_TODO,
                                            payload: index,
                                        })
                                    }
                                >
                                    Bearbeiten
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
