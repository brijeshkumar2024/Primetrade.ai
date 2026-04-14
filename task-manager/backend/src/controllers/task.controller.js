const Task = require('../models/Task');
const mongoose = require('mongoose');

const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    // TODO: add pagination here for large task lists
    const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });

    res.json({
      tasks,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve tasks', error: err.message });
  }
};

const createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Task needs a title' });
    }

    const task = await Task.create({
      user: userId,
      title: title.trim(),
      description: description ? description.trim() : '',
    });

    res.status(201).json({
      message: 'Task created successfully',
      task,
    });
  } catch (err) {
    res.status(500).json({ message: 'Could not create task', error: err.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;

    if (!mongoose.isValidObjectId(taskId)) {
      return res.status(400).json({ message: 'Invalid task id' });
    }

    const task = await Task.findOne({ _id: taskId, user: req.user.id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ task });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching task', error: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    const task = await Task.findOne({ _id: id, user: req.user.id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found or access denied' });
    }

    const { title, description, completed } = req.body;
    const updates = {};

    // only update fields that were provided
    if (title !== undefined) updates.title = title.trim();
    if (description !== undefined) updates.description = description.trim();
    if (completed !== undefined) updates.completed = completed;

    const updated = await Task.findOneAndUpdate(
      { _id: id, user: req.user.id },
      updates,
      { new: true }
    );

    res.json({
      message: 'Task updated successfully',
      task: updated,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update task', error: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    const task = await Task.findOne({ _id: id, user: req.user.id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found or no permission' });
    }

    await Task.findByIdAndDelete(id);

    res.json({
      message: 'Task deleted',
    });
  } catch (err) {
    res.status(500).json({ message: 'Could not delete task', error: err.message });
  }
};

// admin can see all tasks
const getAllTasks = async (req, res) => {
  try {
    // only admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin only' });
    }

    const allTasks = await Task.find()
      .populate('user', 'name email role')
      .sort({ createdAt: -1 });

    res.json({ tasks: allTasks, total: allTasks.length });
  } catch (err) {
    res.status(500).json({ message: 'Error', error: err.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  getAllTasks,
};
