import React, { useState } from "react";
import styles from "./view/todo.module.css";
import { ReactComponent as DeleteIcon } from "assets/svgs/delete.svg";
import { ReactComponent as ChangeIcon } from "assets/svgs/change.svg";

export default function ToDoItem({ title, todo, toggleToDoState, deleteToDo, checked }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className={`${styles.todo__li} ${checked ? styles.todo_checked : ""} box`}>
      <input checked={checked} className={`${styles.todo__checkbox}`} onChange={toggleToDoState} type="checkbox" />
      <div className={`${styles.todo__content_wrapper}`} onClick={() => setIsOpen((prev) => !prev)}>
        <h1 className={`${styles.todo__li__title}`}> {title}</h1>
        {isOpen && (
          <>
            <hr />
            <p className={`${styles.todo__li__todo}`}>{todo}</p>
          </>
        )}
      </div>
      <div className={`${styles.todo__btns}`}>
        <button className={`svg-container ${styles.todo__change}`}>
          <ChangeIcon />
        </button>
        <button onClick={deleteToDo} className={`svg-container ${styles.todo__delte}`}>
          <DeleteIcon />
        </button>
      </div>
    </li>
  );
}
