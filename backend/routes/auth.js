const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator'); //import



// create a User using: POST "/api/auth". Doesnot require Auth
router.post('/', [
    body('name','Enter a valid name').isLength({ min: 5 }),
    body('email','Enter a valid email').isEmail(),
    body('password', 'Enter a valid password which must be five characters').isLength({ min: 5 })

], (req, res) => {
     // Finds the validation errors in this request and wraps them in an object with handy functions
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }

     User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,

      }).then(user => res.json(user)).
      catch(err=>{console.log(err)
        res.json({error:'Please enter a unique value for email', message:err.message})
      })   //validation

    // res.send(req.body)
})

module.exports = router