const router=require('express').Router();
const User=require('../models/User');
const CryptoJS=require('crypto-js');
const jwt=require('jsonwebtoken');
const passport=require('passport');

router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }))

router.get('/google/callback', passport.authenticate('google', 
{failureRedirect: '/failed', session: false}), (req, res) => {
// Fetch JWT from req.user
const jwt = req.user.token;
const id=req.user.id;
req.session = {jwt}
// Successful authentication, redirect home
//res.status(200).redirect('/home');
// res.send({id,jwt})
res.redirect('http://localhost:3000?jwt='+jwt+'&id='+id);

});

module.exports=router;