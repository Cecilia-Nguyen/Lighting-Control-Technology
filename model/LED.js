const mongoose = require("mongoose")
const ledSchema = new mongoose.Schema(
    {
        Name: String,
        Color: String,
        startTime: String,
        endTime: String,
        Power: String


        
    }
)

module.exports  =  mongoose.model("LED", ledSchema)