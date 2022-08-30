const mongoose = require('mongoose')

const activitiesSchema = new mongoose.Schema(
    {
      username_id:{
        reqiured:true,
        type:String
      },
      username:{
          required:true,
          type:String,
        },
        sport: {
            required: true,
            type: String,
          },
          date_post: {
            type: Date,
            required: true,
          },
          date_activites_start: {
            type: Date,
            required: true,
          },
          date_activites_end:{
            type: Date,
            required: true,
          },
          location: {
            type: String,
            required: true,
          },
          captions: {
            type: String,
            required: true,
          },
          sport_photo: {
            type: String,
            required: true,
          },
          user_photo: {
            type: String,
            required: true,
          },

    }
)

const activitiesModel = mongoose.model('activites_tests',activitiesSchema)

module.exports = activitiesModel