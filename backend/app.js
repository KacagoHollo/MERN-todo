const express = require('express');
const cors = require('cors');


const { logger } = require("./middleware/logger")
const auth = require("./middleware/auth")
const { errorHandler } = require("./middleware/errorHandler")

const app = express()


const dashboard = require("./route/dashboard")
const userRoutes = require("./route/user")


app.use(
  cors({
      origin: process.env.APP_URL
  })
);

app.use(express.json())

app.use(logger);

app.use('/api/dashboards', dashboard);
app.use('/api/user', userRoutes);


app.get("/api/public", (req, res) => {
  // console.log("public")
  res.send("Hello public")
})
app.get("/api/private", auth({block: true}), (req, res) => {
  // console.log('private')
  res.send(`Hello private id: ${res.locals.userId}`)
  
})

app.get("/api/anonymus", auth({block: false}), (req , res) => {
  if (!res.locals.userId) return res.send("Hello public") 
  res.send(`Hello anonymus id: ${res.locals.userId}`)
})

// const myBusinessLogic = (req, res) => {
//     if (!res.locals.userId) return res.sendStatus(401)
//     console.log("My business logic runs");
//     res.status(200).json("Success");
// }

app.use(errorHandler)

module.exports = app
