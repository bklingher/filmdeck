var express = require("express"),
    stache = require('stache'),
    less = require('less'),
    public = __dirname + '/public';

var app = express.createServer();

app.configure(function() {
  app.use(express.static(public));
  app.set('views', __dirname + '/views');

  app.set('view engine', 'mustache');
  app.register(".mustache", require('stache'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

app.get("/", function(req, res) {
  res.render('index', {
    locals: {
      title: 'VIDEODOZER',
      username: 'peter'
    }
  });
});

app.get("/v/:id", function(req, res) {
  res.render('video', {
    locals: {
      title: req.params.id,
      source: '/videojs/' + req.params.id + '.mp4'
      //source: '/video/myfile.mp4'
    }
  });
});

app.listen(3001);
console.log('running server on 3001');
