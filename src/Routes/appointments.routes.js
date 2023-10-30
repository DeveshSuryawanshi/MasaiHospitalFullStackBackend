const express = require("express");
const {AppointmentsModel} = require("../Models/appointments.model");
const { auth } = require("../Middlewares/auth.middleware");

const appointmentsRouter = express.Router();
appointmentsRouter.use(auth);


appointmentsRouter.get("/", async(req, res) =>{
    try {
        const appointments = await AppointmentsModel.find();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(400).json({"error" : error.message});
    }
})

appointmentsRouter.post("/add", async(req, res) =>{
    try {
        const data = req.body;
        const NewAppointment = new AppointmentsModel(data);
        await NewAppointment.save();
        res.status(200).json({"msg" : "New Appointment Added Successfully!!"});
    } catch (error) {
        res.status(400).json({"error": error.message});
    }
})

appointmentsRouter.patch("/update/:id", async(req, res) =>{
    try {
        const id = req.params.id;
        await AppointmentsModel.findByIdAndUpdate({_id : id}, req.body);
        res.status(200).json({"msg" : "Appointment detailes updated successfully"});
    } catch (error) {
        res.status(400).json({"error": error.message});
    }
})

appointmentsRouter.delete("/delete/:id", async(req, res) =>{
    try {
        const id = req.params.id;
        await AppointmentsModel.findByIdAndDelete({_id : id});
        res.status(200).json({"msg" : "Appointment deleted successfully"});
    } catch (error) {
        res.status(400).json({"error": error.message});
    }
})

appointmentsRouter.get("/filter/:specialization", async(req, res) =>{
    try {
        const {specialization} = req.params;
        const appointments = await AppointmentsModel.find();
        const filteredDoctor = appointments.filter((doctor) => doctor.specialization === specialization);
        res.status(200).json(filteredDoctor);
    } catch (error) {
        res.status(400).json({"error": error.message});
    }
})

appointmentsRouter.get("/sort", async(req, res) =>{
    try {
        const {order} = req.query;
        if(!order){
            return res.status(400).json({"error" : "No order provided"});
        }else{
            const appointments = await AppointmentsModel.find();
            if(order == "asc"){
                const AcendingdDoctor = appointments.sort((a,b) => new Date(a.date) - new Date(b.date));
                res.status(200).json(AcendingdDoctor);
            }else{
                const DecendingDoctor = appointments.sort((a,b) => new Date(b.date) - new Date(a.date));
                res.status(200).json(DecendingDoctor);
            }
        }
    } catch (error) {
        res.status(400).json({"error": error.message});
    }
})

appointmentsRouter.get("/search", async(req, res) =>{
    try {
        const {doctorName} = req.query;
        const appointments = await AppointmentsModel.find();
        const SearchedDoctor = appointments.filter((doctor) => doctor.name.toLowerCase().includes(doctorName.toLowerCase()));
        res.status(200).json(SearchedDoctor);
    } catch (error) {
        res.status(400).json({"error": error.message});
    }
})




module.exports={
    appointmentsRouter
}