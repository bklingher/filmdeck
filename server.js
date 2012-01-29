var express = require("express"),
    stache = require('stache'),
    public = __dirname + '/public',
    fs = require('fs');

var app = express.createServer();

app.configure(function() {
  app.use(express.static(public));
  app.use(express.bodyParser({uploadDir:'./uploads'}));
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

/*
<form method="post" enctype="multipart/form-data" action="/file-upload">
    <input type="file" name="video">
    <input type="submit">
</form>
*/


app.post('/file-upload', function(req, res, next) {
    console.log(req.body);
    console.log(req.files);

    var file = req.files.video;
    if (file>500000000){
        fs.unlink(file.path, function(err) {
            if (err) throw err;
            console.log('successfully deleted '+file.path);
        });
        res.send("We're sorry. File size cannot exceed 500 MB.");
        return;
    }

    file.rename(file.path, file.name, function (err) {
        if (err) throw err;
        console.log('rename completed');
    });

});

app.listen(3001);
console.log('running server on 3001');
