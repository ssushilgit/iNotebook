const express = require('express')
const router = express.Router()
var fetchuser = require('../middleware/fetchuser'); // jwt nodejs
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator'); //import



// ROUTE 1: Get all the notes using : GET "api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try{
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    }
    catch (error) { // Fix catch block to properly handle the error
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
})


// ROUTE 2: Add new notes using : POST "api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid name').isLength({ min: 5 }),
    body('description', 'Description must be atleast 10 characters').isLength({ min: 10 })

], async (req, res) => {
    try{

        const {title, description, tag} = req.body;
        // Finds the validation errors in this request and wraps them in an object with handy functions
        // if there are errors, then return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title,description, tag, user: req.user.id
        })
        const savedNote = await note.save()
    
        res.json(savedNote)
    }
    catch (error) { // Fix catch block to properly handle the error
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }

})

module.exports = router