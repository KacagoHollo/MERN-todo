// const logger = require('../utils/logger')

exports.errorHandler = (err, req, res, next) => {

    console.log(err)
    // logger.error(new Error("render error"), err.toString());
    res.status(501).json("Something went wrong")
  }