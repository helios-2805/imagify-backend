import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
// importing the mongodb config file
import connectDB from './config/mongodb.js'
import userRouter from './routes/user.routes.js'
import imageRouter from './routes/image.routes.js'

dotenv.config({
  path: './.env'
})

const PORT = process.env.PORT || 4000

// create app
const app = express()
// use cors
app.use(express.json())
app.use(cors())
// connecting the express application with the mongodb db
await connectDB()

app.use('/api/v1/user', userRouter)
app.use('/api/v1/image', imageRouter)


app.get('/', (req, res)=> {
  res.status(200).send('API Working!')
})

app.listen(PORT, ()=> {
  console.log('Server running at',PORT);
});
