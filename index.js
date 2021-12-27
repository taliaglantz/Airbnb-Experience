import express from 'express'
import mongoose from 'mongoose'
import { port, dbURI } from './config/environment.js'
import router from './config/router.js'

const app = express()
const startServer = async () => {
  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('Database has connected ')

    //! Logger Middleware
    app.use((req, _res, next) => {
      console.log(`Incoming request ${req.method} = ${req.url}`)
      next()
    })

    //! Body Parser
    app.use(express.json())

    //! Middleware for router to handle incoming requests
    app.use('/api', router)
    app.listen(port, () => console.log(`👹 Express is running on ${port}`))
  } catch (err) {
    console.log('Somehting has gone wrong', err)
  }
}

startServer()

