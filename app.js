var express=require('express');
var nodemailer = require("nodemailer");
var http = require('http');
var fs = require('fs');
var Hogan = require("hogan.js");
var template = fs.readFileSync("./public/views/mail.html", "utf-8");
var compiledTemplate = Hogan.compile(template);
var bodyParser = require('body-parser');
var validator = require('express-validator');
var path = require('path');
var mime = require('mime');


var app=express();

var port = process.env.PORT || 3000;


var transporter = nodemailer.createTransport({
	    service: 'Gmail',
	    auth: {
	        user: 'innakutsik@gmail.com',
	        pass: '1985+Byyf+1985'
	    }
	});
	  
app.use(express.static('.'));	

app.get('/download', function(req, res){
    var file = "public/docs/Curriculum Vita CV.docx";
    var filename = path.basename(file);
    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.download(file); 
 });

app.get('/',function(req,res){
	res.sendfile('index.html');
});

app.use(bodyParser.json());
app.use(validator());

app.post('/send',function(req,res){
	
	req.checkBody("name", 'Invalid Name').len(2, 20).notEmpty();
    req.checkBody("email", 'Invalid Email').notEmpty().isEmail();	
    req.checkBody("text", 'Invalid Text in Propositions').len(2, 50).notEmpty();
    	
	req.sanitize('name');
  	req.sanitize('email');
  	req.sanitize('text');

  	var errors = req.validationErrors();

  	if (errors) {
	    res.send(errors);
    	return;
  	}

	var mailOptions = {
	    from: req.body.email, // sender address 
	    to: 'innakutsik@gmail.com', // list of receivers 
	    subject: "mysite", // Subject line 
	    html: compiledTemplate.render({who:req.body.name, email: req.body.email, text: req.body.text})// plaintext body // html body 
	};
	
	console.log(mailOptions);
	// send mail with defined transport object 
	transporter.sendMail(mailOptions, function(error, response){
	    if(error){
	        return res.end("error");
	    }
	    res.end('success');
	 
	});
});





app.listen(port,function(){
console.log("Express Started on Port"+port);
});
