const mongoose = require('mongoose');

//Describe de model
const PostSchema = mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description : {
        type : String,
        required : true
    },
    date : {
        type:Date,
        default: Date.now
    },
    status : {
        type: Number,
        default : 1
    }
});

module.exports = mongoose.model('Posts', PostSchema);