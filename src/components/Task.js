//Task.js, i use comments for better understanding of codes
import React from 'react';
import { useDrag } from 'react-dnd';

const Task = ({ task, onDelete, onToggle, filter, index, onTaskDrag }) => {
  const [, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id, index },
  });

  // Skip rendering if the task should be filtered out
  if ((filter === 'completed' && !task.completed) || (filter === 'incomplete' && task.completed)) {
    return null;
  }

  return (
    <div ref={drag}>
      <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.name}
      </h3>
      <p>Added Date: {task.dateAdded}</p>
      <p>Last Date of Task: {task.expirationDate}</p>
      <p>Status(Completed/Incomplete): {task.completed ? 'Completed' : 'Incomplete'}</p>
      <button className='action-button' onClick={() => onDelete(task.id)}>Delete</button>
      <button className='action-button' onClick={() => onToggle(task.id)}>Toggle</button>
      <button className='action-button' onClick={() => onTaskDrag && onTaskDrag(task.id)}>Drag</button>
    </div>
  );
};
export default Task;
