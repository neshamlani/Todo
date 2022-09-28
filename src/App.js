import React, { useState } from "react";
import { Input, Button } from "reactstrap";
import { DragDropContext } from "react-beautiful-dnd";
import MediaQuery from "react-responsive";
import dayjs from "dayjs";
import DesktopView from "./Desktop";
import MobileView from "./Mobile";

const initialState = {
  title: "",
  description: "",
  dueDate: dayjs().format("YYYY-MM-DD"),
};

const listInitialState = [
  {
    title: "To Do",
    data: [],
    id: 1,
  },
  {
    title: "In Progress",
    data: [],
    id: 2,
  },
  {
    title: "On Hold",
    data: [],
    id: 3,
  },
  {
    title: "Completed",
    data: [],
    id: 4,
  },
];

function App() {
  const [addTodo, setTodo] = useState(initialState);
  const [todoList, setTodoList] = useState(listInitialState);

  const handleChange = ({ target: { name, value } }) =>
    setTodo({ ...addTodo, [name]: value });

  const handleAdd = () => {
    let todo = todoList[0];
    todo = {
      ...todo,
      data: [...todo.data, { ...addTodo, id: new Date().getTime() }],
    };
    setTodoList([todo, ...todoList.slice(1)]);
    setTodo(initialState);
  };

  const onDragEnd = (result) => {
    console.log("result", result);
    if (!result.destination) {
      return;
    }
    const { source, destination } = result;
    const { droppableId: sourceId, index: sourceIndex } = source;
    const { droppableId: destinationId, index: destinationIndex } = destination;
    const sourceData = todoList.find((todo) => todo.id === +sourceId);
    console.log("sourceData", sourceData);
    if (sourceId === destinationId) {
      console.log("Same column");
      let data = sourceData.data;
      const currentData = data[sourceIndex];
      data = [...data.slice(0, sourceIndex), ...data.slice(sourceIndex + 1)];
    }
    if (sourceId !== destinationId) {
      const destinationData = todoList.find(
        (todo) => todo.id === +destinationId
      );
      console.log("Different column");
    }
  };

  return (
    <div className="d-flex flex-column">
      <div className="container-xl pt-2">
        <Input
          name="title"
          value={addTodo.title}
          onChange={handleChange}
          placeholder="Enter title"
          className="mb-2"
        />
        <Input
          name="description"
          value={addTodo.description}
          onChange={handleChange}
          placeholder="Enter Description"
          type="textarea"
          max="2"
          className="mb-2"
        />
        <div className="row m-0 w-100">
          <div className="col-8 col-sm-4 p-0">
            <Input
              name="dueDate"
              value={addTodo.dueDate}
              type="date"
              placeholder="Please enter due date"
              onChange={handleChange}
            />
          </div>
          <div className="col-1 col-sm-4" />
          <div className="col-3 col-sm-4 p-0 d-flex justify-content-end">
            <Button onClick={handleAdd}>Save</Button>
          </div>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <MediaQuery minWidth={976}>
          <DesktopView todoList={todoList} />
        </MediaQuery>
        <MediaQuery maxWidth={976}>
          <MobileView todoList={todoList} />
        </MediaQuery>
      </DragDropContext>
    </div>
  );
}

export default App;
