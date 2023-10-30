const express = require('express')
const DoctorRouter = express.Router()
const mongoose = require("mongoose")
const Doctor = require("../DoctorSchema")



DoctorRouter.post("/appointments",async(req,res)=>{
    const {
        name,
        image,
        specialization,
        experience,
        location,
        slots,
        date,
        fee,
      } = req.body;
    console.log(name,image)
      try {
        const newDoctorAppointment = new Doctor({
          name,
          image,
          specialization,
          experience,
          location,
          slots,
          date,
          fee,
        });
    
        const createdAppointment = await newDoctorAppointment.save();
        res.json(createdAppointment);
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'An error occurred' });
      }
})


DoctorRouter.get("/", async(req,res)=>{
    try {
        const appointments = await Doctor.find();
        res.json(appointments);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
      }
})


DoctorRouter.get("/filter/:specialization", async(req,res)=>{

    const { specialization } = req.params;
    try {
      const appointments = await Doctor.find({ specialization });
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }

})

DoctorRouter.get("/sort/:order", async(req,res)=>{

    const { order } = req.params;
  try {
    const appointments = await Doctor.find().sort({ date: order === 'asc' ? 1 : -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }

})



DoctorRouter.get("/search", async(req,res)=>{
    const { doctorName } = req.query;
  try {
    const appointments = await Doctor.find({ name: { $regex: doctorName, $options: 'i' } });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
})


DoctorRouter.put("/:id", async(req,res)=>{
    const { id } = req.params;
    const updatedData = req.body;
  
    try {
      const appointment = await Doctor.findByIdAndUpdate(id, updatedData);
      res.json(appointment);
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: 'An error occurred' });
    }

})


DoctorRouter.delete("/:id", async(req,res)=>{

    const { id } = req.params;
   
    
  try {
    await Doctor.findByIdAndDelete(id);
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'An error occurred' });
  }

})



module.exports = {DoctorRouter}