import React from 'react';
import '../styles/taskitem.css';

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
          className="task-checkbox"
        />
        <div className="task-text">
          <h3>{task.title}</h3>
          {task.description && <p>{task.description}</p>}
          <small>{new Date(task.createdAt).toLocaleDateString()}</small>
        </div>
      </div>
      <button onClick={onDelete} className="btn-delete">
        Delete
      </button>
    </div>
  );
}

export default TaskItem;
