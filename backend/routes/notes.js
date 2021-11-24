const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//ROUTE 1: Fetch all the notes of the user using: GET "/api/notes/fetchalllnotes". Login Required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes)
})

//ROUTE 2: Add a new Note of the user using: POST "/api/notes/addnote". Login Required
router.post('/addnote', fetchuser, [
    //Validation using express-validator
    body('title', 'Enter a valid Title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 Characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        //If there are error, return Bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //Creating a new Note
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()

        //Send the savedNote to the result
        res.json(savedNote)
    } catch (error) {
        //catch the unknown kind of error
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }

})

module.exports = router