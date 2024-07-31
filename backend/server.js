import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser';
import accountRouter from './routes/accountRouters.js'
import staffRouter from './routes/staffRounter.js'
import indicatorRouter from './routes/healIndicatorsRouter.js'
import patientRouter from './routes/patientRouter.js'
import dotenv from 'dotenv'
import connection from './config/connectDB.js';
import initRoutes from './src/routes/index.js';


dotenv.config()
const app = express()
const port = process.env.PORT
app.use(bodyParser.json({ limit: '10mb' }));

app.use(express.json())
app.use(cors())

app.use(morgan('combined'))

connection()
initRoutes(app)

// app.use('/api/account',accountRouter)
// app.use('/api/staff',staffRouter)
// app.use('/api/health-indicators',indicatorRouter)
// app.use('/api/patient',patientRouter)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})