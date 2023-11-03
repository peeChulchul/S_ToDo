import React, { useState } from "react";

import { ReactComponent as DeleteIcon } from "assets/svgs/delete.svg";
import { ReactComponent as ChangeIcon } from "assets/svgs/change.svg";
import ToDoForm from "./todo-form";

export default function ToDoItem({ todoData, setLocalToDos }) {
  const { key, todo, title, state } = todoData;
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState({ title, todo });
  const [isModify, setIsModify] = useState(false);

  function toggleToDoState() {
    setLocalToDos((prev) =>
      prev.map((todo) => {
        if (todo.key === key) {
          return { ...todo, state: !todo.state };
        } else {
          return todo;
        }
      })
    );
  }

  function deleteToDo() {
    setLocalToDos((prev) => prev.filter((todo) => todo.key !== key));
  }

  function onClickChangeBtn() {
    setIsModify(true);
  }

  function onSubmitChange(e) {
    e.preventDefault();
    setLocalToDos((prev) =>
      prev.map((todo) => {
        if (todo.key === key) {
          return { ...todo, title: inputValue.title, todo: inputValue.todo };
        } else {
          return todo;
        }
      })
    );
    setIsModify(false);
  }

  return (
    <>
      {isModify ? (
        <>
          <ToDoForm
            onSubmitFn={onSubmitChange}
            inputValue={inputValue}
            setInputValue={setInputValue}
            btnValue={"Change"}
          />
        </>
      ) : (
        <li className={`todo__li ${state ? "todo_checked" : ""} box`}>
          <input onChange={toggleToDoState} checked={state} className={`todo__checkbox`} type="checkbox" />
          <div className={`todo__content_wrapper`} onClick={() => setIsOpen((prev) => !prev)}>
            <h1 className={`todo__li__title`}> {title}</h1>
            <div className={`todo__li__content ${isOpen ? "open" : ""}`}>
              <hr />
              <p>{todo}</p>
            </div>
          </div>
          <div className={`todo__btns`}>
            <button onClick={onClickChangeBtn} className={`svg-container todo__change`}>
              <ChangeIcon />
            </button>
            <button onClick={deleteToDo} className={`svg-container todo__delte`}>
              <DeleteIcon />
            </button>
          </div>
        </li>
      )}
    </>
  );
}
