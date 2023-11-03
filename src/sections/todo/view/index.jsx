import React from "react";
import { ReactComponent as DarkmodeIcon } from "assets/svgs/darkmode.svg";
import { ReactComponent as LightmodeIcon } from "assets/svgs/lightmode.svg";

export default function ToDo() {
  return (
    <div>
      {/* todo헤더 */}
      <div>
        <h1>TODO</h1>
        <button>
          <LightmodeIcon />
          <DarkmodeIcon />
        </button>
      </div>
      {/* toDo인풋 */}
      <from>
        <input />
        <input />
        <button>Add</button>
      </from>

      {/* Working박스 */}
      <div>Working..</div>

      {/* Done박스 */}
      <div>Done..</div>
    </div>
  );
}
