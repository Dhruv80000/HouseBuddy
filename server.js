var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var morgan = require("morgan");
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require("./app/routers/api")(router);
//var appRoutesB = require("./app/routers/bookapi")(router);
var path = require("path");

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+"/public"));
app.use('/api',appRoutes);
//app.use('/bookapi',appRoutesB);

mongoose.connect('mongodb+srv://mongodbuser:mongodbuser@cluster0-mvmyh.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true,  useCreateIndex: true, useUnifiedTopology: true });
//mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true,  useCreateIndex: true, useUnifiedTopology: true});
var conn = mongoose.connection;

conn.on('connected', function(){
    console.log("Successfully connected !!!");
});
conn.on('disconnected', function(){
    console.log("Successfully disconnected !!!");
});
conn.on('error', console.error.bind(console, 'connection error:'));

app.get("*", function(req, res){
    res.sendFile(__dirname+"/public/app/views/index.html");
})

app.listen(port, function(){
    console.log("connected "+port);
});