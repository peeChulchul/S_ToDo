import React from "react";
import styles from "./layout.module.css";
export default function Layout({ children }) {
  return (
    <>
      {/* 헤더 */}
      <header>
        {/* <div className={`${styles.container}`}>
          <h1 className={`${styles.title}`}>ToDo</h1>
        </div> */}
      </header>
      {/* 메인 */}
      <main>
        <div className={`${styles.container}`}>{children}</div>
      </main>
      {/* 푸터 */}
      <footer>
        <div className={`${styles.container}`}>푸터</div>
      </footer>
    </>
  );
}
