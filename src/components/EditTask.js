import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/tasks/${id}`)
      .then(response => {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setCompleted(response.data.completed);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    
    const task = {
      title,
      description,
      completed
    };

    axios.patch(`http://localhost:5000/api/tasks/${id}`, task)
      .then(res => {
        console.log(res.data);
        navigate('/');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="edit-task">
      <h2>Edit Task</h2>
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
          <div className="form-check">
            <input 
              className="form-check-input" 
              type="checkbox" 
              checked={completed} 
              onChange={e => setCompleted(e.target.checked)} 
              id="completedCheck" 
            />
            <label className="form-check-label" htmlFor="completedCheck">
              Completed
            </label>
          </div>
        </div>
        <div className="form-group">
          <input type="submit" value="Update Task" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default EditTask;