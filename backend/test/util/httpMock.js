const axiosMockAdapter = require("axios-mock-adapter");
const { _instance } = require('../../utils/http')
const jwt = require("jsonwebtoken")
const mock = new axiosMockAdapter(_instance);

const setupGoogleSuccessResponse = (sub) => {
    const token = jwt.sign({sub}, 'secret');
    mock
    .onPost("https://oauth2.googleapis.com/token")
    .replyOnce(200, {id_token: token}) // After the first request to /users, this handler is removed
}
const setupGoogleErrorResponse = () => {
    mock
    .onPost("https://oauth2.googleapis.com/token")
    .replyOnce(401) // After the first request to /users, this handler is removed
}

module.exports = { setupGoogleSuccessResponse, setupGoogleErrorResponse };