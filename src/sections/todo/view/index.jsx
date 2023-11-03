import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as DarkmodeIcon } from "assets/svgs/darkmode.svg";
import { ReactComponent as LightmodeIcon } from "assets/svgs/lightmode.svg";
import "./todo.css";
import { useLocalStorage } from "utils/useLocalStorage";
import ToDoItem from "../todo-item";
import ToDoForm from "../todo-form";
export default function ToDo() {
  const [inputValue, setInputValue] = useState({ title: "", todo: "" });
  const [localToDos, setLocalToDos] = useLocalStorage("todos", []);
  const [localTheme, setLocalTheme] = useLocalStorage("theme");
  const [isDarkMode, setisDarkMode] = useState(false);
  const [workingToDos, setWorkingToDos] = useState([]);
  const [doneToDos, setDoneToDos] = useState([]);

  function onSubmitToDo(e, ref) {
    e.preventDefault();
    const key = Date.now();
    setLocalToDos((prev) => [...prev, { key, title: inputValue.title, todo: inputValue.todo, state: false }]);
    setInputValue(() => ({ title: "", todo: "" }));
    ref.current.focus();
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
    setWorkingToDos(localToDos.filter((todos) => !todos.state)?.sort((a, b) => b.key - a.key));
    setDoneToDos(localToDos.filter((todos) => todos.state)?.sort((a, b) => b.key - a.key));
  }, [localToDos, setLocalToDos]);

  return (
    <>
      {/* todo헤더 */}
      <header>
        <div className={`todo__header`}>
          <h1 className="font-xl">TODO</h1>
          <button
            onClick={() => setLocalTheme((prev) => (prev === "dark" ? "light" : "dark"))}
            className={`svg-container`}
          >
            {isDarkMode ? <DarkmodeIcon /> : <LightmodeIcon />}
          </button>
        </div>

        {/* todo헤더__toDo인풋 */}
        <ToDoForm onSubmitFn={onSubmitToDo} inputValue={inputValue} setInputValue={setInputValue} btnValue={"Add"} />
      </header>

      <main>
        {/* Working박스 */}
        {workingToDos.length > 0 && (
          <section className={`todo__category`}>
            <ul className={`todo__ul`}>
              <h1 className={`box category__title title_working font-lg`}>Working..</h1>

              {workingToDos.map(({ ...todoData }) => (
                <ToDoItem key={todoData.key} todoData={todoData} setLocalToDos={setLocalToDos} />
              ))}
            </ul>
          </section>
        )}

        {/* Done박스 */}
        {doneToDos.length > 0 && (
          <section className={`todo__category`}>
            <ul className={`todo__ul`}>
              <h1 className={`box category__title title_done font-lg`}>Done..</h1>
              {doneToDos.map(({ ...todoData }) => (
                <ToDoItem key={todoData.key} todoData={todoData} setLocalToDos={setLocalToDos} />
              ))}
            </ul>
          </section>
        )}
      </main>
    </>
  );
}
