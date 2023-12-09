require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { default: mongoose } = require('mongoose')
const userRoutes = require('./routes/routes')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

const port = process.env.PORT

//Middlewares

app.use(
  cors({
    origin: "*",
    methods: ['GET', 'POST', 'UPDATE', 'PUT'],
    credentials: true,
  }),
)

app.use(express.json())

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello from server') 
})

app.listen(port, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`Listening on port ${port}!`)
  }
})

mongoose
  .connect(
    process.env.mongodb
  )
  .then(() => {
    console.log('DB Connection Succesfull')
  })
  .catch((err) => {
    console.log(err.message)
  })

app.use(userRoutes)

// page not found error handling  middleware

app.use('*', (req, res, next) => {
  const error = {
    status: 404,
    message: 'API Endpoint does not found',
  }
  next(error)
})

// global error handling middleware
app.use((err, req, res, next) => {
  console.log(err)
  const status = err.status || 500
  const message = err.message || 'Something went wrong'
  const data = err.data || null
  res.status(status).json({
    type: 'error',
    message,
    data,
  })
})
