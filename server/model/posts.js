const mongoose = require("mongoose")


const postOrder = new mongoose.Schema({
    title:String,
    message:String,
    creator:String,
    tage:[String],
    selectedFile:String,
    likedNum:{
        type:Number,
        default:0
    },
    timecreated:{
        type:Date,
        default:new Date()
    }

})

const postMessage = mongoose.model("postMessage",postOrder)

module.exports = postMessage