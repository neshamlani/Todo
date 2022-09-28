import React from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "../TaskCard/TaskCard";
import classes from "./TaskColumn.module.css";

const TaskColumn = ({ columnData }) => {
  const { title, data = [], id } = columnData;

  return (
    <Droppable droppableId={`${id}`}>
      {(provided) => (
        <div
          className={classes.wrapper}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div>{title}</div>
          <div>
            {data.length > 0 &&
              data.map((dt, i) => (
                <TaskCard taskData={dt} key={dt.id} index={i} />
              ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TaskColumn;
