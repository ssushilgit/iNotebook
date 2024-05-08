const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator'); //import
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

JWT_SECRET = "Sushil is a good boy"
// create a User using: POST "/api/auth/createuser". Doesnot require Auth //No login required
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 5 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Enter a valid password which must be five characters').isLength({ min: 5 })

], async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  // if there are errors, then return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

// bcryptjs
// jwt nodejs
// jwt io

  //  check whether user with this email exists already
  try {
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email already exists" })
    }
    const salt =await bcrypt.genSalt(10); //wait until the promise are resolved, take the value and go the next line,  if not resolved then it will directly go to the next line
    const secPass =await bcrypt.hash(req.body.password, salt) //await returns promise
    
    // create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })

    // object data created
    const data={
      user:{
        id: user.id
      }
    }
    var authtoken = jwt.sign(data, JWT_SECRET );  
    res.json({authtoken})
  }
  // catch errors
  catch (error) {
    console.error(error.message)
    res.status(500).send("Some error occured");
  }

})

module.exports = router