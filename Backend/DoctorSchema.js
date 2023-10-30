const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    
  },
  image: {
    type: String,
   
  },
  specialization: {
    type: String,
    enum: ['Cardiologist', 'Dermatologist', 'Pediatrician', 'Psychiatrist'],
   
  },
  experience: {
    type: Number,
   
  },
  location: {
    type: String,
   
  },
  date: {
    type: Date,
    default: Date.now,
  },
  slots: {
    type: Number,

  },
  fee: {
    type: Number,
    
  },
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
