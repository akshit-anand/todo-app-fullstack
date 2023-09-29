import React, { useState, useEffect } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm.jsx";
import TodoHeader from "./components/TodoHeader";
import TodoList from "./components/TodoList";
import axios from "axios";
import TodoFilter from "./components/TodoFilter";

function App() {
  const [todoData, setTodoData] = useState([]);
  // const [newDataAdded, setNewDataAdded] = useState("");

  // const updateList = (newTask) => {
  //   console.log("New Task Added:", newTask);
  //   if (newTask) {
  //     setNewDataAdded("New Task Added");
  //   }
  // };

  // console.log(newDataAdded);

  // if (todoData.length > 0) {
  //   console.log(todoData);
  // }

  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/todos`)
      .then((res) => {
        setTodoData(res.data);
      })
      .then(() => console.log("Fetched Successfully"))
      .catch((error) => console.error("Something Went Wrong", error));
  };
  useEffect(() => {
    getData();
  }, []);

  const filterCompleted = () => {
    const completedTasks = todoData.filter((td) => {
      return td.status === "Completed";
    });
    setTodoData(completedTasks);
  };
  const filterActive = () => {
    const activeTasks = todoData.filter((td) => {
      return td.status === "Not Completed";
    });
    setTodoData(activeTasks);
  };
  const reorderedTodos = (items) => {
    setTodoData(items);
  };

  console.log(todoData);

  return (
    <div className="App">
      <div className="todo-container">
        <TodoHeader />
        <TodoForm updateList={getData} />
        <TodoList
          todoData={todoData}
          updateList={getData}
          reorderTodos={reorderedTodos}
        />
        <TodoFilter
          todoData={todoData}
          updateList={getData}
          filterCompleted={filterCompleted}
          filterActive={filterActive}
        />
      </div>
    </div>
  );
}

export default App;
