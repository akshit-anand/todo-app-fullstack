import axios from "axios";
import React, { useState } from "react";

const TodoForm = (props) => {
  const [newTodo, setNewTodo] = useState("");

  const saveNewTodo = (e) => {
    // console.log(e.target.value);
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo === "") {
      alert("No Value Entered! Please Entered Some Value");
    } else {
      const newTodoData = {
        name: newTodo,
      };

      axios
        .post(`${process.env.REACT_APP_API_URL}/todos/create-new`, newTodoData)

        .then((success) => {
          console.log("added::", success);
          props.updateList();
        })
        .catch((error) => console.error(error));
      setNewTodo("");
    }
  };
  return (
    <div className="todo-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="inputTodo"
          name="inputTodo"
          className="new-input-todo"
          placeholder="Create a new Todo..."
          value={newTodo}
          onChange={saveNewTodo}
        />
      </form>
    </div>
  );
};

export default TodoForm;
