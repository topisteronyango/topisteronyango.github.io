const jwt = require('jsonwebtoken');

module.exports.requireHospitalAuthorization = (req, res, next)=>{
    try
    {
        const bearerHeader = req.headers['authorization'];
        if(!bearerHeader)
        {
            return res.status(401).json({message: 'Authentication headers are not set'});
        }
        else
        {
            const bearer = bearerHeader.split(' ');
            const token = bearer[1];
            if(!token)
            {
                return res.status(401).json({message: 'Authentication token not set'});
            }
            else
            {
                return jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken)=>{
                    if(err)
                    {
                        return res.status(401).json({message: `Invalid authentication token: ${err.message}`});
                    }
                    if(!decodedToken.isHospital)
                    {
                        return res.status(401).json({message: 'Unauthorized to consume this resource'})
                    }
                    else
                    {
                        return next();
                    }
                })
            }
        }
    }
    catch(e)
    {
        throw e;
    }
}