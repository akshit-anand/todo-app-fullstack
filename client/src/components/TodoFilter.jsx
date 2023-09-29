import React from "react";
import axios from "axios";

const TodoFilter = (props) => {
  const notCompletedTask = props.todoData.filter((td) => {
    return td.status === "Not Completed";
  });

  const completedTodos = props.todoData.filter((td) => {
    return td.status === "Completed";
  });

  const completedTodosId = completedTodos.map((ct) => {
    return ct._id;
  });

  const filterAll = async () => {
    props.updateList();
  };
  const filterCompleted = async () => {
    props.updateList();
    setTimeout(() => {
      props.filterCompleted();
    }, 500);
  };
  const filterActive = async () => {
    props.updateList();
    setTimeout(() => {
      props.filterActive();
    }, 500);
  };

  const clearCompletedTasks = async () => {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/todos/delete-completed`, {
        data: { id: completedTodosId },
      })
      .then((success) => {
        console.log("Completed Todo Delete Successfully", success.data);
        props.updateList();
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="todo-footer">
        <div className="todo-count">{notCompletedTask.length} left!</div>

        <div className="todo-filter">
          <div className="filter-btns allBtn" onClick={filterAll}>
            All
          </div>
          <div className="filter-btns activeBtn" onClick={filterActive}>
            Active
          </div>
          <div className="filter-btns completedBtn" onClick={filterCompleted}>
            Completed
          </div>
        </div>

        <div className="clear-completed" onClick={clearCompletedTasks}>
          Clear Completed
        </div>
      </div>
    </>
  );
};

export default TodoFilter;
