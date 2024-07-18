import express from 'express'
import { getStaff, deleteStaff, addStaff, editStaff, getStaffById} from '../controllers/staffController.js'; 

const staffRounter = express.Router();
staffRounter.get('/getStaff', getStaff)
staffRounter.post('/delete', deleteStaff)
staffRounter.post('/add', addStaff)
staffRounter.post('/edit', editStaff)
staffRounter.post('/getById', getStaffById)


export default staffRounter