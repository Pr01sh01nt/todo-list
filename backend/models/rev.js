const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const revSchema = new Schema({
    note : String,
    user  : {type : Schema.Types.ObjectId, ref:'revisionuser'},
}, {timestamps: true}); 


module.exports = mongoose.model('revision', revSchema);