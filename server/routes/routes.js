const express = require('express')
const router = express.Router()
const userController = require('../middlewares/userController')

router.get('/api/users', userController.getAllUsers);
router.get('/api/users/:id', userController.getUser)
router.post('/api/users', userController.createNewUser)
router.put('/api/users/:id', userController.updateUser)
router.delete('/api/users/:id', userController.deleteUser)
router.post('/api/filter', userController.searchUser)
router.post('/api/team', userController.createTeam)
router.get('/api/team/:id', userController.getTeam)
router.get('/api/getAllTeams', userController.getAllTeams)

module.exports = router