import React, { useState } from 'react';

const TodoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);

  const addOrUpdateTask = () => {
    if (editIndex !== null) {
      const updatedTasks = tasks.map((t, index) => (index === editIndex ? task : t));
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, task]);
      setCompletedTasks([...completedTasks, false]);
    }
    setTask('');
  };

  const editTask = (index) => {
    setTask(tasks[index]);
    setEditIndex(index);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    const updatedCompletedTasks = completedTasks.filter((_, i) => i !== index);
    setCompletedTasks(updatedCompletedTasks);
  };

  const toggleTaskCompletion = (index) => {
    const updatedCompletedTasks = completedTasks.map((completed, i) =>
      i === index ? !completed : completed
    );
    setCompletedTasks(updatedCompletedTasks);
  };

  return (
    <div>
      <h2>Todo List</h2>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addOrUpdateTask}>
        {editIndex !== null ? 'Update Task' : 'Add Task'}
      </button>
      <ul>
        {tasks.map((t, index) => (
          <li key={index} style={{ textDecoration: completedTasks[index] ? 'line-through' : 'none' }}>
            <input
              type="checkbox"
              checked={completedTasks[index]}
              onChange={() => toggleTaskCompletion(index)}
            />
            {t}
            <button onClick={() => editTask(index)}>Edit</button>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;