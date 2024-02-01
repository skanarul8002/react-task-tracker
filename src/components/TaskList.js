//TaskList.js
import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, onDelete, onToggle ,onTaskDrag,filter}) => {
  return (
    <div>
      {tasks.map((task, index) => (
        <Task
          key={task.id}
          task={task}
          index={index}
          filter={filter}
          onDelete={onDelete}
          onToggle={onToggle}
          onTaskDrag={onTaskDrag}
        
        />
      ))}
    </div>
  );
};
export default TaskList;


