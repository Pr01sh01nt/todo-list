const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {type: String, unique: true},
    password : String,
    email    : String,

});

module.exports = mongoose.model('revisionuser', userSchema);