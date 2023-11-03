import React, { useEffect, useState } from "react";
import { ReactComponent as DarkmodeIcon } from "assets/svgs/darkmode.svg";
import { ReactComponent as LightmodeIcon } from "assets/svgs/lightmode.svg";
import styles from "./todo.module.css";
import { useLocalStorage } from "utils/useLocalStorage";
import ToDoItem from "../todo-item";
export default function ToDo() {
  const [inputValue, setInputValue] = useState({ title: "", todo: "" });
  const [localToDos, setLocalToDos] = useLocalStorage("todos", []);
  const [localTheme, setLocalTheme] = useLocalStorage("theme");
  const [isDarkMode, setisDarkMode] = useState(false);
  const [workingToDos, setWorkingToDos] = useState([]);
  const [doneToDos, setDoneToDos] = useState([]);

  function onSubmitToDo(e) {
    e.preventDefault();
    const key = Date.now();
    setLocalToDos((prev) => [...prev, { key, title: inputValue.title, todo: inputValue.todo, state: false }]);
    setInputValue(() => ({ title: "", todo: "" }));
  }

  function toggleToDoState(key) {
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

  function deleteToDo(key) {
    setLocalToDos((prev) => prev.filter((todo) => todo.key !== key));
  }

  useEffect(() => {
    const root = document.querySelector("html");
    if (localTheme === null) {
      const darkmode = Array.from(root.classList).includes("dark");
      setisDarkMode(darkmode);
      setLocalTheme(darkmode ? "dark" : "light");
    } else {
      setisDarkMode(localTheme.includes("dark"));
    }
    isDarkMode ? root.classList.add("dark") : root.classList.remove("dark");
  }, [localTheme, setLocalTheme, isDarkMode]);

  useEffect(() => {
    setWorkingToDos(localToDos.filter((todos) => !todos.state));
    setDoneToDos(localToDos.filter((todos) => todos.state));
  }, [localToDos, setLocalToDos]);

  return (
    <>
      {/* todo헤더 */}
      <header>
        <div className={`${styles.todo__header}`}>
          <h1 className="font-xl">TODO</h1>
          <button
            onClick={() => setLocalTheme((prev) => (prev === "dark" ? "light" : "dark"))}
            className={`svg-container`}
          >
            {isDarkMode ? <DarkmodeIcon /> : <LightmodeIcon />}
          </button>
        </div>

        {/* todo헤더__toDo인풋 */}
        <form onSubmit={onSubmitToDo} className={`${styles.todo__form} box`}>
          <div className={`${styles.todo__inputs} `}>
            <input
              onChange={(e) => setInputValue((prev) => ({ title: e.target.value, todo: prev.todo }))}
              value={inputValue.title}
              required
              placeholder="제목을 입력해주세요"
              className={`${styles.todo__input} `}
            />
            <hr style={{ margin: "0px" }} />
            <input
              onChange={(e) => setInputValue((prev) => ({ title: prev.title, todo: e.target.value }))}
              value={inputValue.todo}
              required
              placeholder="내용을 입력해주세요"
              className={`${styles.todo__input} `}
            />
          </div>
          <button className={`${styles.todo__button}`}>Add</button>
        </form>
      </header>

      <main>
        {/* Working박스 */}
        {workingToDos.length > 0 && (
          <section className={`${styles.todo__category}`}>
            <ul className={`${styles.todo__ul}`}>
              <h1 className={`box ${styles.category__title} ${styles.title_working} font-lg`}>Working..</h1>

              {workingToDos.map(({ state, key, todo, title }) => (
                <ToDoItem
                  checked={state}
                  deleteToDo={() => deleteToDo(key)}
                  toggleToDoState={() => toggleToDoState(key)}
                  key={key}
                  title={title}
                  todo={todo}
                />
              ))}
            </ul>
          </section>
        )}

        {/* Done박스 */}
        {doneToDos.length > 0 && (
          <section className={`${styles.todo__category}`}>
            <ul className={`${styles.todo__ul}`}>
              <h1 className={`box ${styles.category__title} ${styles.title_done} font-lg`}>Done..</h1>
              {doneToDos.map(({ state, key, todo, title }) => (
                <ToDoItem
                  checked={state}
                  deleteToDo={() => deleteToDo(key)}
                  toggleToDoState={() => toggleToDoState(key)}
                  key={key}
                  title={title}
                  todo={todo}
                />
              ))}
            </ul>
          </section>
        )}
      </main>
    </>
  );
}
