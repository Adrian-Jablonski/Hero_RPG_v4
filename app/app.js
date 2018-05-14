var express = require("express");
var Bundler = require("parcel-bundler");
var path = require("path");
var http = require("http");
var app = express();
var server = http.Server(app);
app.use(express.static("public"));
var bodyParser = require('body-parser');

var bundler = new Bundler(path.resolve(__dirname, '../game/index.html'));

app.use(bundler.middleware());

app.set("view engine", "ejs");  // Sets up EJS
app.set("views", "views")   // Tells where to find the file. This depends on where the package.json files are saved 

app.use(require("./routes/"));

server.listen(3000, function(){
    console.log('Port 3000!');
});

//reload(server, app);
