var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var api = require('./app/api/timestamp.js');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// this middleware will be executed for every request to the app
app.use(function (req, res, next) {
  console.log('Current Time: %d', Date.now());
  next();
});

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');

api(app);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


