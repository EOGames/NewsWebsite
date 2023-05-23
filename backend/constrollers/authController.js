const jwt = require('jsonwebtoken');
const privateKey = 'itsPrivate12345';

const { OAuth2Client } = require('google-auth-library');
const oath_client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);



module.exports.checkJwt = (req, res, next) => {
    console.log('Its Here');
    if (req.headers.authorization !== undefined) {
        console.log('Checking');
        const token = req.headers.authorization.split(" ")[1];

        let isValid = false;

        console.log('token::::', token);
        jwt.verify(token, privateKey, (err) => {
            if (err) {
                console.log('error by auth controller [jwt verify] :::::', err);
                isValid = false;
                return res.status(401).json({ message: 'Invalid Login Session' });
            }

        });

        // else 
        // {
        isValid = true;
        next();
        // }
        // return res.status(200).json({message:'Valid Session'});
    }
    else {
        return res.status(403).json({ message: 'Invalid Login Session No Token' });
    }
}

module.exports.validateGoogleLogin = async (req,res,next) =>
{
    try 
    {
        if (req.headers.authorization !== undefined)
        {
            const googleToken = req.headers.authorization.split(" ")[1];

            const valid = await checkGoogleToken(googleToken);

            if (valid)
            {
                console.log("Google Token Is Valid");
                next();
            }
            else
            {
                return res.status(401).json({status:401,message:'Not A Valid Google Token Or Expired'});
            }
        }
        else
        {
            console.log('[authController] No Google Token Provided');
            return res.status(401).json({status:401,message:' Unauthorized Acess Google Token Not Found [authController]'});
        }
    }
     catch (error) 
    {
        console.log('Error in Validate Google Login in [authController]::::',error);
    }
}

 const checkGoogleToken =  async(google_token) => {
    try 
    {
        const ticket = await oath_client.verifyIdToken({
            idToken: google_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        if (payload) {
            // means key is valid
            console.log(payload);
            return true;
        }
        else {
            // means key is invalid
            return false;
        }

    }
    catch (error) {
        console.log('ERROR Catched in [authController.js]:', error);
        return false;
    }
}