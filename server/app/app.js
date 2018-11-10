var express = require("express");
var app = express();
var path = require("path");
var http = require("http");
var https = require("https");


app.set('port', process.env.PORT || 3001);
app.set('sport', 443);


var server = http.createServer(app);

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
app.use(express.static(path.join(__dirname + '/../../client')));

server.listen(app.get('port'), function() {
    console.log('Express server listening on port, NodeJS server running -- ' + app.get('port'));
});


