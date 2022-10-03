import {DragDropContext,Droppable} from "react-beautiful-dnd"
import './App.css';
import Column from './column';
import React from "react";
import { useState } from 'react';
function App() {

  const initialData = {
    tasks: {
      "task-1": { id: "task-1", content: "Take out the garbage" },
      "task-2": { id: "task-2", content: "Watch my favorite show" },
      "task-3": { id: "task-3", content: "Charge my phone" },
      "task-4": { id: "task-4", content: "Cook dinner" }
    },
    columns: {
      "column-1": {
        id: "column-1",
        title: "To do",
        taskIds: ["task-1", "task-2"]
      },
      "column-2": {
        id: "column-2",
        title: "In progress",
        taskIds: ["task-3"]
      },
      "column-3": {
        id: "column-3",
        title: "Success",
        taskIds: ["task-4"]
      }
    },
    // Facilitate reordering of the columns
    columnOrder: ["column-1", "column-2","column-3"]
  };
  console.log("column orrder" + initialData.columnOrder)
  const [columns, setColumns]=useState(initialData.columnOrder)
  const [state, setState]=useState(initialData.columns)
  //const [tasksHere, setTasksHere]=useState(initialData.tasks)
  //console.log(states);
  const handleDragEnd = ({ destination, source, type }) => {
	
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder =[...columns]
      const [remove]=newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, remove)
      setColumns(newColumnOrder);
      return ;
	  
    }
	const itemCopy={...state[source.droppableId].taskIds[source.index]}
	console.log("itemCopy"+ itemCopy)
    setState(pre=>{
        pre={...pre}
        const [u]=pre[source.droppableId].taskIds.splice(source.index,1)
        pre[destination.droppableId].taskIds.splice(destination.index,0,u)
        return pre;
		
    })
  }
  return (
    
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div className="App" {...provided.droppableProps} ref={provided.innerRef}>
              {columns.map((columnId, index) => {
                //const column =initialData.columns[columnId];
				console.log("columnId"+ columnId)
				const column =state[columnId];
                const tasks =column.taskIds.map((taskId) =>(initialData.tasks[taskId]));
                return (
                  <Column
                    key={column.id}	
                    column={column}
                    index={index}
                    tasks={tasks}
                  />
                );
              }
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
  
  );
}

export default App;
