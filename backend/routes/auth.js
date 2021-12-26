const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = 'LAKSHAY@IS@GREAT'

//ROUTE 1: Create a User using: POST "/api/auth/createUser". Doesnt require Authentication
router.post('/createuser', [
    body('email', 'Enter a Valid Email').isEmail(),
    body('name', 'Enter a Valid Name').isLength({ min: 3 }),
    body('password', 'Password must be atleast 6 characters').isLength({ min: 6 })
], async (req, res) => {
    //If there are error, return Bad request and errors
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({ errors: errors.array() });
    }

    //Check whether email exists already
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            success = false
            return res.status(400).json({ success, error: "Email already in use" });
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

        //Token creation using jwt
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);

        //Display the Token for the New user created
        success = true
        res.json({ success, authToken })
    } catch (error) {
        //catch the unknow kind of error
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})


//ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    //If there are error, return Bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let success = false;
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        //Token creation using jwt
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);

        //Display the Token for the New user created
        success = true;
        res.json({ success, authToken })
    } catch (error) {
        //catch the unknow kind of error
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})

//ROUTE 4: Delete User details using: "/api/auth/deleteuser". Login Required
router.delete('/deleteuser', fetchuser, async(req, res) => {
    try{
        //Find User to be deleted
        let user = await User.findByIdAndDelete(req.params.id);

        //json the success
        res.json({"success" : "true", user : user})

    }catch(error){
        //Some random Error
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})


//ROUTE 3: Get User details using: POST "/api/auth/getuser". Login Required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userID = req.user.id;
        const user = await User.findById(userID).select("-password")
        res.send(user)
    } catch (error) {
        //catch the unknow kind of error
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})


module.exports = router