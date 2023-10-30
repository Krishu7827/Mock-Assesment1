const express = require('express')
const router = express.Router()
const User = require("../UserSchema")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")


router.post("/signup",async(req,res)=>{
    try {
        const { email, password, confirmPassword } = req.body;
        console.log(email,password,confirmPassword)
    
        // Validate input
        if (!email || !password || !confirmPassword) {
          return res.status(400).json({ error: 'All fields are required' });
        }
    
        if (password !== confirmPassword) {
          return res.status(400).json({ error: 'Passwords do not match' });
        }
    
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: 'Email already registered' });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new user in the database
        const user = new User({ email, password: hashedPassword });
        await user.save();
    
        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, "Medical");
    
        res.json({token: token });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
      }
})


router.post("/login", async(req,res)=>{
       
    try {
        const { email, password } = req.body;
    
        // Validate input
        if (!email || !password) {
          return res.status(400).json({ error: 'Email and password are required' });
        }
    
        // Find the user in the database by email
        const user = await User.findOne({ email });
    
        // If the user doesn't exist, return an error
        if (user==[]) {
          return res.status(400).json({ error: 'User not found' });
        }
    
        // Compare passwords (bcrypt.compare)
        const isPasswordMatch = await bcrypt.compare(password, user.password);
    
        // If passwords match, generate a JWT token
        if (isPasswordMatch) {
          const token = jwt.sign({ userId: user._id }, "Medical");
          res.json({token: token });
        } else {
          res.status(401).json({ error: 'Invalid credentials' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
      }
})


module.exports = {router}