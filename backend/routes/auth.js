const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'LAKSHAYISGREAT'

//Create a User using: POST "/api/auth/createUser". Doesnt require Authentication
router.post('/createuser', [
    body('email', 'Enter a Valid Email').isEmail(),
    body('name', 'Enter a Valid Name').isLength({ min: 3 }),
    body('password', 'Password must be atleast 6 characters').isLength({ min: 6 })
], async (req, res) => {
    //If there are error, return Bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //Check whether email exists already
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Email already in use" });
        }

        //Adding salt using bcryptnpm package
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //Create a new User
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);

        //Display the New user created
        res.json({authToken})
    }catch(error){
        //catch the unknow kind of error
        console.log(error.message)
        res.status(500).send("Some error occured")
    }
})

module.exports = router