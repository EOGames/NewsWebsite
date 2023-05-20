const User = require('../models/userModel');

module.exports.register = async (req, res) => {
    const { email, name, lastName, password } = req.body;

    
    try {
        const foundUser = await User.findOne({ email: email });
        if (!foundUser) 
        {
            let newUser = new User(
                {
                    email: email,
                    name: name,
                    lastName: lastName,
                    password: password
                });

            let response = await newUser.save();
            console.log('new User Registered ', response);

            return res.status(200).json({ message: 'User Register Sucessfully' });

        }
        else
        {
            return res.status(409).json({message: 'User Already Registered'});
        }
    }
    catch (err) {
        console.log('registerController.js While Registration Got Error: ', err);
        return res.status(500).json({ message: 'Error While Registering', error: err })
    }
}