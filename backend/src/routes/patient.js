import * as controllers from '../controllers'
import express from 'express'

const router =express.Router()
router.get('/get', controllers.getAll)
router.post('/getByFace', controllers.getByFace)
router.post('/getById', controllers.findByPk)
export default router