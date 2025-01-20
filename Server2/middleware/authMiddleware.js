const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {

    const header = req.headers['authorization'];
    
    const token = header && header.split(' ')[1];

    if(!token){
        return res.status(401).json({
            success:false,
            message:'Access Denied. No token provided.'
        })
    }

    try {
        const decode = jwt.verify(token,process.env.SECRET_KEY);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(403).json({
            success:false,
            message: 'Invalid Token.'
        })
    }
}

module.exports =verifyToken;

