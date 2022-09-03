import express from 'express'
// router
import authRoutes from './routes/authRoutes.js'

import dosarRoutes from './routes/dosarRoutes.js'
import actRoutes from './routes/actRoutes.js'
import authorize from './middleware/auth.js'

const app = express()

import dotenv from 'dotenv'
dotenv.config()
import connectDB from './db/connect.js'
import 'express-async-errors'
import morgan from 'morgan'

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'



// middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

if(process.env.NODE_ENV !== 'production'){
  app.use(morgan('dev'))
}

app.use(express.json())

app.use(helmet())
app.use(xss())
app.use(mongoSanitize())
const __dirname = dirname(fileURLToPath(import.meta.url))


// app.get('/',(req, res)=>{
//   res.send('Welcome')
// })

app.use('/api/auth', authRoutes)

app.use('/api/dosar',authorize, dosarRoutes)
app.use('/api/act',authorize, actRoutes)
// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/build')))

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000


const start = async()=>{
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port,()=>console.log(`Server is listening on port ${port}`))
  } catch (error) {
    console.log(error);
  }
}

start()