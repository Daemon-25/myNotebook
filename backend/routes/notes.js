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

//ROUTE 3: Update Existing note of the user using: PUT "/api/notes/updatenote". Login Required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        //Create a new Note object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Find the note to be updated and update it
        let note = await Note.findById(req.params.id);

        //If no note is present then send an error
        if (!note) { return res.status(404).send("Not Found") }

        //If user updating is not the owner of the note
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Authorized"); }

        //Update the new note
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

        res.json({ note });
    } catch (error) {
        //catch the unknown kind of error
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})

//ROUTE 4: Delete note of the user using: DELETE "/api/notes/deletenote". Login Required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //Find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);

    //If no note is present then send an error
    if (!note) { return res.status(404).send("Not Found") }

    //If user deleteing is not the owner of the note
    if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Authorized"); }

    //delete the new note
    note = await Note.findByIdAndDelete(req.params.id);

    res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        //catch the unknown kind of error
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
    
})

module.exports = router