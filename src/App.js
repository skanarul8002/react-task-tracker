//App.js:
import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'incomplete'

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []); // Run the effect only once when the component mounts

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: tasks.length + 1, expirationDate: task.expirationDate }]);
  };
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') {
      return task.completed;
    } else if (filter === 'incomplete') {
      return !task.completed;
    }
    return true; // 'all' filter
  });

  const handleTaskDrag = (taskId, dragIndex) => {
    const updatedTasks = [...tasks];
    const draggedTask = updatedTasks.find((task) => task.id === taskId);
    const remainingTasks = updatedTasks.filter((task) => task.id !== taskId);

    remainingTasks.splice(dragIndex, 0, draggedTask);

    setTasks(remainingTasks);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h1>React Task Tracker</h1>
        <TaskForm onAddTask={addTask} />

        <div>
          <label>
            <h2>
              Filter:
              <select value={filter} onChange={(e) => handleFilterChange(e.target.value)}>
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
              </select>
            </h2>
          </label>
        </div>
        <TaskList tasks={filteredTasks} onDelete={deleteTask} onToggle={toggleTask} onTaskDrag={handleTaskDrag} />
      </div>
    </DndProvider>
  );
};
export default App;
