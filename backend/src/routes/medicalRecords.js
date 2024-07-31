import * as controllers from '../controllers'
import express from 'express'

const router =express.Router()
router.post('/getById', controllers.getById)
export default router