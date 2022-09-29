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
    id: 0,
  },
  {
    title: "In Progress",
    data: [],
    id: 1,
  },
  {
    title: "On Hold",
    data: [],
    id: 2,
  },
  {
    title: "Completed",
    data: [],
    id: 3,
  },
];

function App() {
  const [addTodo, setTodo] = useState(initialState);
  const [todoList, setTodoList] = useState(listInitialState);

  //Function to handle input change
  const handleChange = ({ target: { name, value } }) =>
    setTodo({ ...addTodo, [name]: value });

  //Function which adds new todo item
  const handleAdd = () => {
    let todo = todoList[0];
    todo = {
      ...todo,
      data: [...todo.data, { ...addTodo, id: new Date().getTime() }],
    };
    setTodoList([todo, ...todoList.slice(1)]); //Appended updated first column back and spread rest of the columns
    setTodo(initialState);
  };

  //Function which handles drag end
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const { source, destination } = result;
    const { droppableId: sourceId, index: sourceIndex } = source; // destructing source data
    const { droppableId: destinationId, index: destinationIndex } = destination; // destructing destination data
    let updatedTodo = [...todoList]; //Shallow copy
    let sourceData = updatedTodo[+sourceId]; //Fetch the current column
    let data = sourceData.data; //Get the data of current column
    const currentData = data[+sourceIndex]; //Get the data of the card which was dragged
    data = [...data.slice(0, +sourceIndex), ...data.slice(+sourceIndex + 1)]; //Remove that card from the array
    if (sourceId === destinationId) {
      data.splice(+destinationIndex, 0, currentData); //Append the card to the updated location
      sourceData.data = data; //Update the array back to column
      updatedTodo[+sourceId] = sourceData; //Update the column back to the complete list
      setTodoList(updatedTodo); //Update the state with the updated list and re-render the UI
    }
    if (sourceId !== destinationId) {
      sourceData.data = data; //Update the array back to column
      updatedTodo[+sourceId] = sourceData; //Update the column back to the complete list
      let destinationData = updatedTodo[+destinationId];
      let destData = destinationData.data;
      destData.splice(+destinationIndex, 0, currentData); //Append the card to the updated location
      destinationData.data = destData; //Update the array back to column
      updatedTodo[+destinationId] = destinationData; //Update the column back to the complete list
      setTodoList(updatedTodo); //Update the state with the updated list and re-render the UI
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
