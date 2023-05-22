const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const privateKey = 'itsPrivate12345';
const jwtExpireTime = '60s';

module.exports.login = async (req,res) =>
{
    const {email,password} = req.body;

   // console.log('LoginController.js::: Login Atempt:::: email:' +email,'password:',password);
    const foundUser = await User.findOne({email:email});

    if (!foundUser)
    {
        return res.status(403).json({message:'Invalid Credentials'});
    }
    else
    {
        if (foundUser.password !== password)
        {
            return res.status(403).json({message:'Invalid Credentials'});
        }else
        {
            const token = jwt.sign({email:foundUser.email,name:foundUser.name,lastName:foundUser.lastName},privateKey,{expiresIn:jwtExpireTime});
            return res.status(200).json({message:'Logged In SucessFully',token:token});
        }
    }
}

module.exports.adminLogin = (req,res) =>
{
    const{email,password} = req.body;

    try 
    {
        if (email === 'admin' && password === 'admin')
        {
            return res.status(200).json({message: 'Access Approved'});
        }
        else
        {
            return res.status(403).json({message:'Access Denied'});
        }   
    }
     catch (error) 
    {
        return res.status(500).json(error) ;
    }
}