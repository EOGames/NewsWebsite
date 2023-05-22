const jwt = require('jsonwebtoken');
const privateKey = 'itsPrivate12345';

module.exports.checkJwt = (req, res, next) =>
 {
    console.log('Its Here');
    if (req.headers.authorization !== undefined) 
    {
        console.log('Checking');
        const token = req.headers.authorization.split(" ")[1];

        let isValid = false;

        console.log('token::::',token);
        jwt.verify(token, privateKey, (err) =>
         {
            if (err) 
            {
                console.log('error by auth controller [jwt verify] :::::',err);
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
    else
    {        
        return res.status(403).json({ message: 'Invalid Login Session No Token' });
    }


}