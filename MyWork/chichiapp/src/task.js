import React from "react";
import { Draggable } from "react-beautiful-dnd";
import './App.css'

export default function Task ({tasks}) {
    return (
      
      tasks.map((task,index) =>(
        
        <Draggable key={task.id} draggableId={task.id} index={index}>
        
        {(provided) => (
          
          <div className="Task"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {task.content}
          
          </div>
        )}
      </Draggable>
      ))

        
    );

      
}
