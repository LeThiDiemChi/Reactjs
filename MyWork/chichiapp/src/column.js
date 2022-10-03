import React from "react";
import {  Droppable,Draggable } from "react-beautiful-dnd";
import Task from "./task";
import './App.css';
export default function Column ({tasks, index, column, state}) {
  console.log('1111'+ tasks);
      return (
        <Draggable key={column.id} draggableId={column.id} index={index}>
          {(provided) => (
            <div className={"Container"} {...provided.draggableProps} ref={provided.innerRef}>
              <h3 {...provided.dragHandleProps}>
                {column.title}
              </h3>
              <Droppable droppableId={column.id} type="task">
              {(provided) => (
                <div className="Column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                 
                >
                <Task tasks={tasks} state={state} index={index}/> 
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
             
              
            </div>
          )}
        </Draggable>
      );
    }
 
  