const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const privateKey = 'itsPrivate12345';
const jwtExpireTime = '60s';

module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    // console.log('LoginController.js::: Login Atempt:::: email:' +email,'password:',password);
    const foundUser = await User.findOne({ email: email });

    if (!foundUser) {
        return res.status(403).json({ message: 'Invalid Credentials' });
    }
    else {
        if (foundUser.password !== password) {
            return res.status(403).json({ message: 'Invalid Credentials' });
        } else {
            const token = jwt.sign({ email: foundUser.email, name: foundUser.name, lastName: foundUser.lastName }, privateKey, { expiresIn: jwtExpireTime });
            return res.status(200).json({ message: 'Logged In SucessFully', token: token });
        }
    }
}

module.exports.adminLogin = (req, res) => {
    const { email, password } = req.body;

    try {
        if (email === 'admin' && password === 'admin') {
            return res.status(200).json({ message: 'Access Approved' });
        }
        else {
            return res.status(403).json({ message: 'Access Denied' });
        }
    }
    catch (error) {
        return res.status(500).json(error);
    }
}

module.exports.loginWithGoogle = async (req, res) => {
    try 
    {
        const googleToken = req.headers.authorization.split(" ")[1];

        const decodedToken = jwt.decode(googleToken);
        console.log('decoded Google Token ', decodedToken);
        const foundUser = await User.findOne({email:decodedToken.email});

        if (!foundUser) 
        {
            // means user not found its new user register it and then log it in
            let newUser = new User(
                {
                    email: decodedToken.email,
                    name: decodedToken.given_name,
                    lastName: decodedToken.family_name,
                    password: 'Signed By Google No Password'
                });
            let response = await newUser.save();
            console.log('New User Registration With Google:::::', response);

            //genrating JWT Token To Manage Login Session for New User
            const token = jwt.sign({ email: decodedToken.email, name: decodedToken.given_name, lastName: decodedToken.family_name }, privateKey, { expiresIn: jwtExpireTime });
            return res.status(200).json({ message: ' New User Google Sign In SucessFully', token: token });
        }
        else
        {
            const token = jwt.sign({ email: foundUser.email, name: foundUser.name, lastName: foundUser.lastName }, privateKey, { expiresIn: jwtExpireTime });
            return res.status(200).json({ message: 'Google Sign In Successfully', token: token });
        }

    } 
    catch (error)
    {
        console.log('Error While Google Sign In In [loginController.js] Error is::: ',error);
    }
}