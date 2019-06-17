const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/task.controller');
//const ctrlUser = require('../controllers/user.controller');


//router.post('/register', ctrlUser.register);
//router.post('/login',ctrlUser.login);

router.get('/tasks',ctrlUser.get);
router.post('/task', ctrlUser.post);

router.delete('/tasks/:id',ctrlUser.delete);
router.put('/task/:id',ctrlUser.put);

module.exports = router;