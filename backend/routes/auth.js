const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator'); //import
const bcrypt = require('bcrypt'); // bcryptjs
var jwt = require('jsonwebtoken'); // jwt nodejs
var fetchuser = require('../middleware/fetchuser'); // jwt nodejs



JWT_SECRET = "Sushilisagoodbd$boy"
// ROUTE 1: create a User using: POST "/api/auth/createuser". Doesnot require Auth //No login required
// user endpoint
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 5 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Enter a valid password which must be five characters').isLength({ min: 5 })

], async (req, res) => {
  let success = false;

  // Finds the validation errors in this request and wraps them in an object with handy functions
  // if there are errors, then return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }
  //  check whether user with this email exists already
  try {
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({success, error: "Sorry a user with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10); //wait until the promise are resolved, take the value and go the next line,  if not resolved then it will directly go to the next line
    const secPass = await bcrypt.hash(req.body.password, salt) //await returns promise

    // create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })

    // object data created
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET); // jwt io
    success = true; 
    res.json({ success, authtoken })


  }
  // catch errors
  catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error");
  }

})

// ROUTE 2: Authenticating a User Login using: POST "/api/auth/login". Doesnot require Auth //No login required
// user endpoint
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists()

], async (req, res) => {
  const errors = validationResult(req);
  let success = false;

  // Finds the validation errors in this request and wraps them in an object with handy functions
  // if there are errors, then return Bad request and the errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false;
      return res.status(400).json({ success, error: 'Please login with correct credentials' })
    }
    // compare the password in the database with the user entered password
    // if not found error message occured
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success, error: 'Please login with correct credentials' })
    }
    // if found, then user id will be send
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET); // jwt io
    success = true
    res.send({ success, authtoken })
  }
  catch (error) { // Fix catch block to properly handle the error
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

})

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser,  async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
module.exports = router