var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.post('/hello', function(req, res){
	var apiUrl = req.body.data['apiUrl'];
  	var credentials = req.body.data['headers'];
	console.log(apiUrl + "    c= " + credentials);
	var options = {
    		uri: apiUrl,
    		headers: {
      			'Authorization': credentials
    		}
  	};

	request(options, function (error, response, body) {
		console.log(error);
		if (!error && response.statusCode == 200) {
  		  	console.log(body);
		var digits = JSON.parse(body)
      		return res.send({
        	phoneNumber: digits.phone_number,
        	userID: digits.id_str,
        	error: ''
      		});
		} else {
			return res.send({
        			phoneNumber: '',
        			userID: '',
        			error: error.message
      			});
		}
	});
});
var port = process.env.PORT || 5000;
var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
});

