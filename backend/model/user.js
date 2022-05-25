const mongoose = require('mongoose');


const todoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true}, // empty string is enough
    isDone: {type: Boolean, default: false},
})

const dashboardSchema = new mongoose.Schema({
    title: {type: String, required: true},
    todos: [todoSchema] // empty list is default?
});

const userSchema = new mongoose.Schema({ // authenticateToken
    username: {type: String, unique: true, required: true}, // !!!
    googleId: {type: String, required: true, unique: true}, // validation
    // password: {type: String, required: true}, // validation
    dashboards: [dashboardSchema], // empty list is default?
});

const User = mongoose.model("user", userSchema);
module.exports = User;