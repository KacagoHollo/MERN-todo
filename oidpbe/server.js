require("dotenv").config();
const mongoose = require('mongoose');
const app = require('./app')

const port = process.env.PORT

mongoose.connect('mongodb://localhost:27017/templateBE', {
  useNewUrlParser: true,
useUnifiedTopology: true,
// useFindAndModify: false
}, () => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})
