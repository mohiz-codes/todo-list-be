

const mongoose = require("mongoose")


const todoscheme = mongoose.Schema({
    text : {
        type : String,
        required : true
    },
    status : {
        type : String,
        default : false,
    }
},{timestamps: true}
)

module.exports = mongoose.model("Todo",todoscheme)
