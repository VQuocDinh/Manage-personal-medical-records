import express from 'express'
import { deleteUser, getAccount, login, register } from '../controllers/accountControllers.js'; 

const accountRouter = express.Router();
accountRouter.post('/login', login)
accountRouter.post('/register', register)
accountRouter.get('/get', getAccount)


export default accountRouter