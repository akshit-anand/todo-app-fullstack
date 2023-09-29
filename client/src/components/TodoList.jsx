import React from "react";
import TodoListItem from "./TodoListItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";

const TodoList = (props) => {
  const todoData = props.todoData;

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const updatedTodoList = Array.from(todoData);
    const [reorderedItem] = updatedTodoList.splice(result.source.index, 1);
    updatedTodoList.splice(result.destination.index, 0, reorderedItem);

    props.reorderTodos(updatedTodoList);
    axios
      .put(`${process.env.REACT_APP_API_URL}/todos/updateTodoList`, {
        updatedTodoList: updatedTodoList,
      })
      .then((success) => {
        console.log("todos list updated", success.data);
        // props.updateList();
      })
      .catch((error) => console.log(error));
  }
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="todo-list">
        {(provided) => (
          <div
            className="todo-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <form>
              {todoData.map((todo, index) => (
                <Draggable key={todo._id} draggableId={todo._id} index={index}>
                  {(provided) => (
                    <TodoListItem
                      // key={todo._id}
                      id={todo._id}
                      name={todo.name}
                      status={todo.status}
                      updateList={props.updateList}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    />
                  )}
                </Draggable>
              ))}
            </form>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
