import express from 'express'
import {
    getUser,
    getUserFriends,
    addRemoveFriend
} from  "../contollers/userController.js"
import { verifyToken } from '../middleware/validation.js'

const userRouter = express.Router()

//read
userRouter.get('/:id', verifyToken, getUser)
userRouter.get('/:id', verifyToken, getUserFriends)

//update
userRouter.patch('/:id/:friendId', verifyToken, addRemoveFriend)

export default userRouter;