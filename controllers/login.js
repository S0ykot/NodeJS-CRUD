var express 	= require('express');
var router 		= express.Router();
var userModel	= require.main.require('./models/user-model');
var md5 = require('md5');

router.get('/', function(req, res){
	console.log('login page requested!');
	res.render('login/index');
});

router.post('/', function(req, res){
		
		var user ={
			uname: req.body.uname,
			password: md5(req.body.password)
		};

		userModel.validate(user, function(status){
			if(status){
				res.cookie('username', req.body.uname);
				res.redirect('/home');
			}else{
				res.redirect('/login');
			}
		});
});

module.exports = router;

