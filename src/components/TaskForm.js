// TaskForm.js
import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState(''); //task
  const [expirationDate, setExpirationDate] = useState(''); //for expire date
  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskName.trim() === '' || expirationDate.trim() === '') return;
// Format the expiration date to dd-mm-yyyy
const formattedDate = new Date(expirationDate).toLocaleDateString('en-GB');

    onAddTask({ name: taskName, dateAdded: new Date().toLocaleDateString(), expirationDate: formattedDate, completed: false });

    setTaskName('');
    setExpirationDate('');
  };
 //return form
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add Task"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      
      <input
        type="date"
        placeholder="Expiration Date"
        value={expirationDate}
        onChange={(e) => setExpirationDate(e.target.value)}
      />
      <button id='b3' type="submit">Add</button>
    </form>
  );
};
export default TaskForm;
