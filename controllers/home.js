var express 	= require('express');
var router 		= express.Router();
var userModel   = require.main.require('./models/user-model');
var md5 = require('md5');

router.get('/', function(req, res){
	
	if(req.cookies['username'] != null){
		
		userModel.getByUname(req.cookies['username'], function(result){
			res.render('home/index', {user: result});
		});

	}else{
		res.redirect('/logout');
	}
});

router.get('/alluser', function(req, res){

	userModel.getAll(function(results){
		if(results.length > 0){
			res.render('home/alluser', {userlist: results});
		}else{
			res.send('invalid username/password');
		}
	});
});


router.get('/edit/:id', function(req, res){
	var ID = req.params.id;
	userModel.getById(ID,function(results){
		console.log(results);
		if(results!=null){
			res.render('home/edit', {details: results});
		}else{
			res.send('Not working');
		}
	});
});


router.post('/edit/:id', function(req, res){
	var info ={
		uid : req.params.id,
		username : req.body.uname,
		password : md5(req.body.pass),
		type : req.body.type
	};
	userModel.update(info,function(status){
		if(status){
			res.redirect('../alluser');
		}else{
			res.send('Not working');
		}
	});
});



module.exports = router;

