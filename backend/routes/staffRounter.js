import express from 'express'
import { getStaff, deleteStaff, addStaff, editStaff, getStaffById, getByName} from '../controllers/staffController.js'; 

const staffRounter = express.Router();
staffRounter.get('/getStaff', getStaff)
staffRounter.post('/delete', deleteStaff)
staffRounter.post('/add', addStaff)
staffRounter.post('/edit', editStaff)
staffRounter.post('/getById', getStaffById)
staffRounter.post('/search', getByName)


export default staffRounter