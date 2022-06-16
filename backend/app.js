const express = require('express');
const cors = require('cors');
require('express-async-errors');

const { logger } = require("./middleware/logger")
const morgan = require("morgan");
const auth = require("./middleware/auth")
const { errorHandler } = require("./middleware/errorHandler")

const app = express()


const dashboard = require("./route/dashboard")
const userRoutes = require("./route/user")


app.use(
  cors({
      origin: process.env.APP_URL,
      optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

app.use(express.json())
// app.use(logger); //minden hívásnál automatikusan lefut ez a middleware
app.use(morgan(":method :url :status :res[content-length] - :response-time ms")); // use this middleware on every request, logger
// app.use(auth); //de ezt nem akarom minden endpoint hívásnál meghívni, ezért elehlyezhetem másként, a (req, res) elé
// app.use(auth()); //így is használható amúgy te csicskagyász

app.use('/api/dashboards', dashboard);
app.use('/api/user', userRoutes);


app.get("/api/public", (req, res) => {
  // console.log("public")
  res.send("Hello public")
})
app.get("/api/private", auth({block: true}), (req, res) => {
  // console.log('private')
  res.send(`Hello private id: ${res.locals.userID}`)
  
})

app.get("/api/anonymus", auth({block: false}), (req , res) => {
  if (!res.locals.userID) return res.send("Hello public") 
  res.send(`Hello anonymus id: ${res.locals.user.userID}`)
})

// const myBusinessLogic = (req, res) => {
//     if (!res.locals.userId) return res.sendStatus(401)
//     console.log("My business logic runs");
//     res.status(200).json("Success");
// }

app.use(errorHandler)

module.exports = app
