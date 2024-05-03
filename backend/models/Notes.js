const mongoose = require('mongoose');

const NotesSchema = new Schema({
    title:{
        type: String,
        requird: true
    },
    description:{
        type: String,
        requird: true
        },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('notes',NotesSchema)
