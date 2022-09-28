import React from "react";
import dayjs from "dayjs";
import { useMediaQuery } from "react-responsive";
import { Draggable } from "react-beautiful-dnd";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";

const TaskCard = ({ taskData, index }) => {
  const { title, description, dueDate, id } = taskData;
  const isMobile = useMediaQuery({ maxWidth: 976 });
  return (
    <Draggable draggableId={`${id}`} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card
              color="light"
              style={{
                width: "100%",
                marginBottom: "8px",
                userSelect: "none",
                cursor: "grab",
              }}
            >
              <CardBody>
                <CardTitle tag="h5">{title}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Due Date: {dayjs(dueDate).format("DD - MMM - YYYY")}
                </CardSubtitle>
                <CardText>Description: {description}</CardText>
                {isMobile && (
                  <div className="d-flex justify-content-between">
                    <Button>Prev</Button>
                    <Button>Next</Button>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
        );
      }}
    </Draggable>
  );
};

export default TaskCard;
