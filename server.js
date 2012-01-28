var express = require("express");
var stache = require('stache');

var app = express.createServer();

app.configure(function() {
  app.set('view engine', 'mustache');
  app.register('.mustache', stache);
});

app.get("/", function(req, res) {
  res.render('index', {
    locals: {
      title: 'Express'
    }
  });
});

app.listen(3001);

