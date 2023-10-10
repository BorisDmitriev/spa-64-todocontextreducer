import "./App.css";
import TodoList from "./components/TodoList";
import TodoProvider from "./context/TodoProvider";

function App() {
    return (
        <TodoProvider>
            <div className="App">
                <header className="App-header">
                    <TodoList />
                </header>
            </div>
        </TodoProvider>
    );
}

export default App;
