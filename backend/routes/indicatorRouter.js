import express from 'express'
import {  getAll } from '../controllers/indicatorController.js'; 

const indicatorRouter = express.Router();
indicatorRouter.get('/get', getAll)



export default indicatorRouter