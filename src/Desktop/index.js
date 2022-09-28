import React from "react";
import TaskColumn from "../Components/TaskColumn";

const DesktopView = ({ todoList }) => {
  return (
    <div className="row w-100 m-0 pt-3 h-100">
      {todoList.map((todo) => (
        <div className="col-3" key={todo.id}>
          <TaskColumn columnData={todo} />
        </div>
      ))}
    </div>
  );
};

export default DesktopView;
