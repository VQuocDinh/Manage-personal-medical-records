import express from 'express'
import {  getAll, getByPatient } from '../controllers/healthIndicatorsController.js'; 

const indicatorRouter = express.Router();
indicatorRouter.get('/get', getAll)
indicatorRouter.post('/getByPatient', getByPatient)



export default indicatorRouter