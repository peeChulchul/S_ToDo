import React from "react";
import { ReactComponent as DarkmodeIcon } from "assets/svgs/darkmode.svg";
import { ReactComponent as LightmodeIcon } from "assets/svgs/lightmode.svg";
import { ReactComponent as DeleteIcon } from "assets/svgs/delete.svg";
import styles from "./todo.module.css";
export default function ToDo() {
  return (
    <div>
      {/* todo헤더 */}
      <div className={`${styles.todo__header}`}>
        <h1 className="font-xl">TODO</h1>
        <button className={`svg-container`}>
          <LightmodeIcon />
          <DarkmodeIcon />
        </button>
      </div>
      {/* toDo인풋 */}
      <form className={`${styles.todo__form} box`}>
        <div className={`${styles.todo__inputs} `}>
          <input placeholder="제목을 입력해주세요" className={`${styles.todo__input} `} />
          <input placeholder="내용을 입력해주세요" className={`${styles.todo__input} `} />
        </div>
        <button className={`${styles.todo__button}`}>Add</button>
      </form>

      {/* Working박스 */}
      <section>
        <ul className={`${styles.todo__ul}`}>
          <h1 className={`box ${styles.todo__working} font-lg`}>Working..</h1>
        </ul>
      </section>

      {/* Done박스 */}
      <section>
        <ul className={`${styles.todo__ul}`}>
          <h1 className={`box ${styles.todo__done} font-lg`}>Done..</h1>
          <li className={`${styles.todo__li} box`}>
            <input className={`${styles.todo__checkbox}`} type="checkbox" />
            <div className={`${styles.todo__content_wrapper}`}>
              <h1 className={`${styles.todo__li__title}`}>제목입니다.</h1>
              <p className={`${styles.todo__li__todo}`}>아주아주 긴~~~~~~~~~~~~~~내용입니다.</p>
            </div>
            <button className={`svg-container ${styles.todo__delte}`}>
              <DeleteIcon />
            </button>
          </li>
        </ul>
      </section>
    </div>
  );
}
