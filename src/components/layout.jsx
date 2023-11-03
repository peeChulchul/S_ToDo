import React from "react";
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
        <div className="container">{children}</div>
      </main>
      {/* 푸터 */}
      <footer>
        <div className="container"></div>
      </footer>
    </>
  );
}
