import express from 'express'
import { getFeedPosts, getUserPosts, likePost } from '../contollers/postsController.js'
import { verifyToken } from '../middleware/validation.js'

const postRoutes = express.Router()

//read
postRoutes.get('/', verifyToken, getFeedPosts)
postRoutes.get('/:usesrId/posts', verifyToken, getUserPosts)

//update
postRoutes.patch('/:id/like', verifyToken, likePost)

export default postRoutes