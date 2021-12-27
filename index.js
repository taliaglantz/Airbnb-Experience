import express from 'express'
import mongoose from 'mongoose'
import { port, dbURI } from './config/environment.js'
import router from './config/router.js'
import path from 'path' // * <—- a new import from node

const app = express()
const __dirname = path.resolve() // * this line has been added, note this has a double underscore before it

const startServer = async () => {
  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('Database has connected ')

    
    //! Logger Middleware
    app.use((req, _res, next) => {
      console.log(`Incoming request ${req.method} = ${req.url}`)
      next()
    })

    //! Bit added in for deployment
    app.use(express.static(`${__dirname}/front-end/build`)) // * <— This line has been added before the express json middleware, it will allow the app to respond to a request with contents of this directory “build”, which will contain our React App code.
    
    //! Body Parser
    app.use(express.json())

    //! Middleware for router to handle incoming requests
    app.use('/api', router)
    //! Bit added in for deployment
    app.use('/*', (_, res) => res.sendFile(`${__dirname}/front-end/build/index.html`)) // * <— This additional route handler has been added between the router and error handler middleware, it means that any incoming request that does not match a route in router should respond back with our frontend.
    
    app.listen(port, () => console.log(`👹 Express is running on port ${port}`))
  } catch (err) {
    console.log('Something has gone wrong', err)
  }
}

startServer()

