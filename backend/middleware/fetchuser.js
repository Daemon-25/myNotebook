const jwt = require('jsonwebtoken')
const JWT_SECRET = 'LAKSHAY@IS@GREAT'

const fetchuser = (req, res, next) => {
    //Gt the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        //If there is no token provided
        return res.status(401).send({ error: "Please authenticate using a valid Token" });
    }
    try {
        //id is verified from the toen using jwt.verify
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        //Call the next function
        next();
    } catch (error) {
        return res.status(401).send({ error: "Please authenticate using a valid Token" });
    }

}

module.exports = fetchuser;