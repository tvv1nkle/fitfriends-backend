const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema(
    {
       
        username:{type:String},
        password:{type:String ,},
        age:{type:Number},
        weight:{type:Number},
        height:{type:Number},
        bmi:{type:Number}, 
        user_photo: {type: String }
    }
)

const UsersModel = mongoose.model('username_tests',usersSchema)

module.exports = UsersModel