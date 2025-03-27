import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/api/tasks/${id}`)
      .then(response => {
        setTasks(tasks.filter(task => task._id !== id));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const toggleComplete = (id, completed) => {
    axios.patch(`http://localhost:5000/api/tasks/${id}`, { completed: !completed })
      .then(response => {
        setTasks(tasks.map(task => 
          task._id === id ? { ...task, completed: !completed } : task
        ));
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="task-list">
      <h2>Tasks</h2>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>
                <button 
                  onClick={() => toggleComplete(task._id, task.completed)}
                  className={task.completed ? "btn btn-success" : "btn btn-warning"}
                >
                  {task.completed ? 'Completed' : 'Pending'}
                </button>
              </td>
              <td>
                <Link to={`/edit/${task._id}`} className="btn btn-primary mr-2">Edit</Link>
                <button 
                  onClick={() => deleteTask(task._id)} 
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;