const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const {router} = require("./Routers/User")
const {DoctorRouter} = require('./Routers/Doctor')
require("dotenv").config()
const app = express()
app.use(express.json())
app.use(cors())



mongoose.connect(process.env.Mongo_Url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.get("/",(req,res)=>{
    res.send({msg:"Hello!"})
})
app.use("/User",router)

app.use("/Doctor",DoctorRouter)






app.listen(process.env.Port,()=>{
    console.log(`  server is running on ${process.env.Port}`)
})
