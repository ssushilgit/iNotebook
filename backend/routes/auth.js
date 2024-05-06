const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator'); //import



// create a User using: POST "/api/auth/createuser". Doesnot require Auth //No login required
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 5 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Enter a valid password which must be five characters').isLength({ min: 5 })

], async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  // if there ar errors, then return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //  check whether user with this email exists already
  try {
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email already exists" })
    }
    // create a new user
    user = await User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
    })
    res.json(user)
  }
  // catch errors
  catch (error) {
    console.error(error.message)
    res.status(500).send("Some error occured");
  }

})

module.exports = router