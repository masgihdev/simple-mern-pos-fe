import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    
    const task = {
      title,
      description,
      completed: false
    };

    axios.post('http://localhost:5000/api/tasks', task)
      .then(res => {
        console.log(res.data);
        navigate('/');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="add-task">
      <h2>Add New Task</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title: </label>
          <input 
            type="text" 
            required 
            className="form-control" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Description: </label>
          <textarea 
            className="form-control" 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Add Task" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default AddTask;