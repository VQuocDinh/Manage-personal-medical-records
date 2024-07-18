import express from 'express'
import morgan from 'morgan'
import path from 'path'
import cors from 'cors'
import accountRouter from './routes/accountRouters.js'
import staffRouter from './routes/staffRounter.js'
import indicatorRouter from './routes/indicatorRouter.js'
// app config
const app = express()
const port = process.env.PORT || 3000

//middelware
app.use(express.json())
app.use(cors())

// use morgan
app.use(morgan('combined'))

// api endpoint
app.use('/api/account',accountRouter)
app.use('/api/staff',staffRouter)
app.use('/api/indicator',indicatorRouter)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})