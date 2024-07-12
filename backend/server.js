import express from 'express'
import morgan from 'morgan'
import path from 'path'
import userRouter from './routes/userRouters.js'
import cors from 'cors'
// app config
const app = express()
const port = process.env.PORT || 3000

//middelware
app.use(express.json())
app.use(cors())

// use morgan
app.use(morgan('combined'))

// api endpoint
app.use('/api/user',userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})