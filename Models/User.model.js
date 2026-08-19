const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const Userschema = mongoose.Schema({
   
    email : {type : String , required : true , unique : true},
    password : {type : String , required : true},

}

)


Userschema.pre("save",async function(
    
) {
    this.password = await  bcrypt.hash(this.password,10);

})

module.exports = mongoose.model("User", Userschema) // convert schema into model