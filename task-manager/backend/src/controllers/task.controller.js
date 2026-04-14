const Task = require('../models/Task');
const mongoose = require('mongoose');

const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const userTasks = await Task.find({ user: userId }).sort({ createdAt: -1 });

    res.json({
      tasks: userTasks,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err.message });
  }
};

const createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const newTask = await Task.create({
      user: userId,
      title: title.trim(),
      description: description ? description.trim() : '',
    });

    res.status(201).json({
      message: 'Task created',
      task: newTask,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error creating task', error: err.message });
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
    const taskId = req.params.id;

    if (!mongoose.isValidObjectId(taskId)) {
      return res.status(400).json({ message: 'Invalid task id' });
    }

    const task = await Task.findOne({ _id: taskId, user: req.user.id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const { title, description, completed } = req.body;
    const updateData = {};

    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (completed !== undefined) updateData.completed = completed;

    const updated = await Task.findOneAndUpdate(
      { _id: taskId, user: req.user.id },
      updateData,
      { new: true }
    );

    res.json({
      message: 'Task updated',
      task: updated,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error updating task', error: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    if (!mongoose.isValidObjectId(taskId)) {
      return res.status(400).json({ message: 'Invalid task id' });
    }

    const task = await Task.findOne({ _id: taskId, user: req.user.id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await Task.findByIdAndDelete(taskId);

    res.json({
      message: 'Task deleted',
    });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task', error: err.message });
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
