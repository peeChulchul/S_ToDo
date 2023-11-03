import React, { useRef } from "react";

export default function ToDoForm({ inputValue, setInputValue, onSubmitFn, btnValue }) {
  const inputRef = useRef();

  return (
    <form onSubmit={(e) => onSubmitFn(e, inputRef)} className={`todo__form box`}>
      <div className={`todo__inputs `}>
        <input
          onChange={(e) => setInputValue((prev) => ({ title: e.target.value, todo: prev.todo }))}
          value={inputValue.title}
          required
          maxLength={30}
          placeholder="제목을 입력해주세요"
          className={`todo__input todo__input-title`}
          ref={inputRef}
        />
        <hr style={{ margin: "0px" }} />
        <input
          onChange={(e) => setInputValue((prev) => ({ title: prev.title, todo: e.target.value }))}
          value={inputValue.todo}
          required
          placeholder="내용을 입력해주세요"
          className={`todo__input`}
        />
      </div>
      <button className={`todo__button`}>{btnValue}</button>
    </form>
  );
}
