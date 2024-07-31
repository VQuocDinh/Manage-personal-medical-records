import express from 'express'
import multer from 'multer'
import {getByFace, getAll} from '../controllers/patientController.js'

// const upload = multer({ dest: 'uploads/' });

const patientRouter = express.Router()
patientRouter.post('/recognize-face', getByFace)
patientRouter.post('/get', getAll)

export default patientRouter