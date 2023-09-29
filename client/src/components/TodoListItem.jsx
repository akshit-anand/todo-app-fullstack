import React, { useState, useEffect, forwardRef } from "react";
import axios from "axios";

const TodoListItem = forwardRef(
  ({ id, name, status, updateList, ...dragProps }, ref) => {
    const [todoText, setTodoText] = useState(name);
    const [todoID, setTodoID] = useState();
    const [todoTextStatusStyle, setTodoTextStatusStyle] = useState(
      "todo-input todo-input-not-marked"
    );

    //store todo details - text and id when click on textbox
    const getTodo = (e) => {
      setTodoText(e.target.value);
      setTodoID(e.target.id);
    };

    //store todo updated value when start editing text
    const editTodo = (e) => {
      setTodoText(e.target.value);
    };

    // update todo to database on focus out
    const updateTodo = (e) => {
      // const id = e.target.id
      // axios
      //   .patch(`${process.env.REACT_APP_API_URL}/todos/update/${id}`, updatedText)
      //   .then((success) => console.log("task updated", success.data))
      //   .catch((error) => console.log(error));

      const updatedText = {
        id: todoID,
        name: todoText,
      };
      axios
        .patch(`${process.env.REACT_APP_API_URL}/todos/update`, updatedText)
        .then((success) => console.log("todo updated", success.data))
        .catch((error) => console.log(error));
    };

    //delete todo from database on X button click
    const deleteTodo = (e) => {
      const id = e.target.id;
      axios
        .delete(`${process.env.REACT_APP_API_URL}/todos/delete/${id}`)
        .then((success) => {
          console.log("deleted::", success);
          updateList();
        })
        .catch((error) => console.log(error));
    };

    // Mark complete or not complete using checkbox

    // console.log(props.status);
    const [checkBoxState, setCheckBoxState] = useState(false);
    const [checkBoxStatus, setCheckBoxStatus] = useState(status);

    useEffect(() => {
      if (checkBoxStatus === "Not Completed") {
        setCheckBoxState(false);
        setTodoTextStatusStyle("todo-input todo-input-not-marked");
      } else {
        setCheckBoxState(true);
        setTodoTextStatusStyle("todo-input todo-input-marked");
      }
    }, [checkBoxStatus]);

    const updateStatus = (updatedStatus) => {
      axios
        .patch(`${process.env.REACT_APP_API_URL}/todos/update`, updatedStatus)
        .then((success) => {
          console.log("todos status updated", success.data);
          updateList();
        })
        .catch((error) => console.log(error));
    };

    const checkBoxFn = (e) => {
      let newStatus;
      if (checkBoxStatus === "Not Completed") {
        setCheckBoxState(true);
        setCheckBoxStatus("Completed");
        newStatus = "Completed";
      } else {
        setCheckBoxState(false);
        setCheckBoxStatus("Not Completed");
        newStatus = "Not Completed";
      }

      const updatedStatus = {
        id: e.target.id,
        status: newStatus,
      };
      updateStatus(updatedStatus);
    };

    return (
      <div className="todo" id={id} ref={ref} {...dragProps}>
        <div className="reorder">=</div>
        <label className="checkbox-container">
          <input
            type="checkbox"
            id={id}
            className="checkbox"
            name={todoText}
            checked={checkBoxState}
            onChange={checkBoxFn}
            value={checkBoxStatus}
            status={checkBoxStatus}
          />
          <span className="checkmark"></span>
        </label>
        <input
          type="text"
          id={id}
          className={todoTextStatusStyle}
          value={todoText}
          onClick={getTodo}
          onChange={editTodo}
          onBlur={updateTodo}
          // onKeyPress={updateTodo}
        />
        <button type="button" id={id} className="delete" onClick={deleteTodo}>
          X
        </button>
      </div>
    );
  }
);

export default TodoListItem;

//i use content editable in task text but now i am not using because i am using input suppressContentEditableWarning={true} is use to remove the warning cause by contentEditable attrib because there is an explanation on stack overflow -
/** Setting the contentEditable html attribute allows the contents of that element to be modified in the browser. React is warning you that you have children within that element that are managed by React. React only works from the top down. Meaning it manages a model at the top level and maintains a virtual DOM representing that data, then renders the DOM tree based on that virtual DOM. Any changes you make to the DOM outside of React (such as setting contentEditable and allowing the content to be edited by a user directly in the browser) will be potentially blown away or cause problems for React when it goes to update those managed elements.

In your situation you don't care that the {this.props.children} node gets blown away because you know you're catching the changes and doing what you need to with it. It's just warning you that you better not expect that node to remain intact and accurately updated by React when you're letting the content be edited by the browser directly. */
