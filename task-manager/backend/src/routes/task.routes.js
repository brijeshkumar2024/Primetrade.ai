const express = require('express');
const router = express.Router();
const taskCtrl = require('../controllers/task.controller');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/roleCheck');

// all task routes require authentication
router.use(auth);

// user routes
router.get('/', taskCtrl.getTasks);
router.post('/', taskCtrl.createTask);

// admin only
router.get('/admin/all', checkRole('admin'), taskCtrl.getAllTasks);

router.get('/:id', taskCtrl.getTaskById);
router.put('/:id', taskCtrl.updateTask);
router.delete('/:id', taskCtrl.deleteTask);

module.exports = router;
