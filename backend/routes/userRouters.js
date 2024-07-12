import express from 'express'
import { deleteUser, getUser, login, register } from '../controllers/userControllers.js'; 

const userRouter = express.Router();
userRouter.post('/login', login)
userRouter.post('/register', register)
userRouter.get('/getUser', getUser)
userRouter.post('/deleteUser', deleteUser)

export default userRouter