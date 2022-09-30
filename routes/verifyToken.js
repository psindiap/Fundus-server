const jwt=require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config()

const verifyToken=async (req,res,next)=>{
    const authHeader=req.headers.token;
    if(authHeader)
    {
        const token=authHeader.split(' ')[1];
        jwt.verify(token,process.env.JWT_KEY,(err,decoded)=>{
            if(err)
            {
                res.status(401).send('Invalid Token');
            }
            else
            {
                req.user=decoded;
                next();
            }
        })
    }
    else
    {
        res.status(401).send('Not Authorized');
    }
}

const verifyTokenAndAuthorization=async (req,res,next)=>{
    verifyToken(req,res,async ()=>{
        console.log(req.user.id);
        console.log(req.params.id);
        if(req.user.id===req.params.id)
        {
            next();
        }
        else
        {
            res.status(401).send('Not Authorized');
        }
    })
}

module.exports={
    verifyToken,
    verifyTokenAndAuthorization
}