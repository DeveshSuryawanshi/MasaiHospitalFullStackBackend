const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
    name : String,
    image : String,
    specialization  : String,
    experience : Number,
    location : String,
    date : {type : Date, default : Date.now},
    slots : Number,
    fee : Number
},{
    versionKey : false
})

const AppointmentsModel = mongoose.model("appointment", appointmentSchema);

module.exports={
    AppointmentsModel
}