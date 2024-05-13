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

// ROUTE 3: Update notes using : PUT "api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;
    // Create a newNote object
    const newNote = {};
    if(title) {newNote.title = title}; //if there is title, then the title will be upated at newNote
    if(description) {newNote.description = description}; //if there is description, then the description will be upated at newNote
    if(tag) {newNote.tag = tag}; //if there is tag, then the tag will be upated at newNote

    // Find the note to be updated and update them
    let note = await Note.findById(req.params.id) //it is the id of the user who want to update the note
    if(!note){
        return res.status(404).send("Not Found")
    }
    if(note.user.toString()!== req.user.id){ //This line checks if the user making the request is the owner of the note. It compares the ID of the authenticated user (req.user.id) with the ID of the user who created the note ('note.user'). If they do not match, it returns a 401 error response indicating that the user is not allowed to update the note.
        return res.status(401).send("Not Allowed")
    }
    note =await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note});

})

module.exports = router