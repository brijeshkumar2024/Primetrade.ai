import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getTasks, createTask, updateTask, deleteTask } from '../utils/api';
import TaskItem from '../components/TaskItem';
import '../styles/dashboard.css';

function Dashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const [myTasks, setMyTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getTaskKey = (task) => task._id || task.id;

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await getTasks();
      setMyTasks(response.data.tasks || []);
    } catch (err) {
      // quick fix, will refactor later
      setError(err.response?.data?.message || 'Failed to load tasks');
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title required');
      return;
    }

    setIsLoading(true);
    try {
      const response = await createTask(title, description);
      setMyTasks([...myTasks, response.data.task]);
      setTitle('');
      setDescription('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTask = async (taskId, currentCompleted) => {
    try {
      const response = await updateTask(taskId, { completed: !currentCompleted });
      const updatedTask = response.data.task;
      const updatedId = updatedTask._id || updatedTask.id;
      setMyTasks(myTasks.map((t) => {
        const currentId = t._id || t.id;
        return currentId === updatedId ? updatedTask : t;
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setMyTasks(myTasks.filter((t) => (t._id || t.id) !== taskId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task');
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Task Manager</h1>
          <div className="user-info">
            <span>Welcome, {user?.name}</span>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-container">
        <div className="add-task-section">
          <h2>Add New Task</h2>
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleAddTask} className="add-task-form">
            <input
              type="text"
              placeholder="Task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-title"
            />
            <textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-desc"
              rows="3"
            />
            <button type="submit" disabled={isLoading} className="btn-add">
              {isLoading ? 'Adding...' : 'Add Task'}
            </button>
          </form>
        </div>

        <div className="tasks-section">
          <h2>Your Tasks ({myTasks.length})</h2>
          {myTasks.length === 0 ? (
            <p className="no-tasks">No tasks yet. Create one to get started!</p>
          ) : (
            <div className="tasks-list">
              {myTasks.map((task) => (
                <TaskItem
                  key={getTaskKey(task)}
                  task={task}
                  onToggle={() => handleToggleTask(getTaskKey(task), task.completed)}
                  onDelete={() => handleDeleteTask(getTaskKey(task))}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  onLogout: PropTypes.func.isRequired,
};

export default Dashboard;
