const router=require('express').Router();
const User=require('../models/User');
const jwt=require('jsonwebtoken');
const { verifyToken, verifyTokenAndAuthorization } = require('./verifyToken');

router.get('/check',verifyToken,async (req,res)=>{
    try{
        const user=await User.findById(req.user.id);
        if(user)
        {
            try{
                const updatedUser=await User.findByIdAndUpdate(req.user.id,{ 
                    "$set": {[`pictures.$[outer]`]:{id:req.params.photoId,...(req.body)}}
                },{ 
                    "arrayFilters": [{ "outer.id": req.params.photoId }],"new": true
                });
                
                res.status(200).json(updatedUser);
            }catch(err){
                res.status(400).send({message:"Error in updating"});
            }
        }
        else
        {
            res.status(404).send('User Not Found');
        }
    }catch(err){
        res.status(400).send(err);
    }
})


router.post('/update/:photoId',verifyToken,async (req,res)=>{
    try{
        const user=await User.findById(req.user.id);
        if(user)
        {
            try{
                const updatedUser=await User.findByIdAndUpdate(req.user.id,{ 
                    "$set": {[`pictures.$[outer]`]:{id:req.params.photoId,...(req.body)}}
                },{ 
                    "arrayFilters": [{ "outer.id": req.params.photoId }],"new": true
                });
                
                res.status(200).json(updatedUser);
            }catch(err){
                res.status(400).send({message:"Error in updating"});
            }
        }
        else
        {
            res.status(404).send('User Not Found');
        }
    }catch(err){
        res.status(400).send(err);
    }
})

router.get('/getImage/:photoId',verifyToken,async (req,res)=>{
    try{
        const user=await User.findById(req.user.id);
        if(user)
        {
            if(user.pictures.length>=req.params.photoId)
            {
                res.status(200).json(user.pictures[req.params.photoId-1]);
            }
            else
            {
                res.status(404).send('Image Not Found');
            }
        }
        else
        {
            res.status(404).send('User Not Found');
        }
    }catch(err){
        res.status(400).send(err);
    }
})

module.exports=router;

