const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Todo(props) {
  const updateTodo = async (todoId, todoStatus) => {
    const res = await fetch(`${API_URL}/api/todos/${todoId}`, {
      method: "PUT",
      body: JSON.stringify({ status: !todoStatus }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();

    if (json.acknowledged) {
      props.setTodos((currentTodos) =>
        currentTodos.map((currentTodo) => {
          if (currentTodo._id === todoId) {
            return { ...currentTodo, status: !currentTodo.status };
          }
          return currentTodo;
        })
      );
    }
  };

  const deleteTodo = async (todoId) => {
    const res = await fetch(`${API_URL}/api/todos/${todoId}`, {
      method: "DELETE",
    });
    const json = await res.json();

    if (json.acknowledged) {
      props.setTodos((currentTodos) =>
        currentTodos.filter((currentTodo) => currentTodo._id !== todoId)
      );
    }
  };

  return (
    <div className="todo">
      <p>{props.todo.todo}</p>
      <div className="mutations">
        <button
          className="todo__status"
          onClick={() => updateTodo(props.todo._id, props.todo.status)}
        >
          {props.todo.status ? "☑" : "☐"}
        </button>
        <button
          className="todo__delete"
          onClick={() => deleteTodo(props.todo._id)}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}