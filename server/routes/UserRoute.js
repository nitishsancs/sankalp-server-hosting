const express = require("express")
const router = express.Router()

export const maxDuration = 55;

const { createUser,getUser,getUserById,getUserId } = require("../controllers/UserController")

router.get('/', getUser) // gets all users
router.get('/:id', getUserById) // gets a specific user based on user id
router.post('/login', getUserId) // logs in a user
router.post('/create', createUser) // creates a user

module.exports = router