var express = require("express");
var stache = require('stache');

var app = express.createServer();

app.configure(function() {
  app.use(express.static(__dirname + '/public'));
  app.set('view engine', 'mustache');
  app.register('.mustache', stache);
});

app.get("/", function(req, res) {
  res.render('index', {
    locals: {
      title: 'Express',
      source: '/video/myfile.mp4'
    }
  });
});

app.get("/v/:id", function(req, res) {
  res.render('video', {
    locals: {
      title: 'Express',
      
      source: '/videojs/' + req.params.id + '.mp4'
      //source: '/video/myfile.mp4'
    }
  });
});

app.listen(3001);
console.log('running server on 3001');
