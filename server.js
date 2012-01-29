var express = require("express"),
    stache = require('stache'),
    public = __dirname + '/public',
    fs = require('fs');

var app = express.createServer();

app.configure(function() {
  app.use(express.static(public));
  app.use(express.bodyParser({uploadDir:'./public/uploads'}));
  app.set('view engine', 'mustache');
  app.register('.mustache', stache);
});



app.get("/", function(req, res) {
  res.render('index', {
    locals: {
      title: 'VIDEODOZER'
    }
  });
});

app.get("/v/:id", function(req, res) {
  res.render('video', {
    locals: {
      title: req.params.id,
      source: '/uploads/' + req.params.id + '.mp4'
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

    res.contentType('json');

    var file = req.files.video;


    
    if (file.type.split('/')[0] != 'video'){
        fs.unlink(file.path, function(err) {
            if (err) throw err;
            console.log('successfully deleted '+file.path);
        });
        res.send("We're sorry. We can only accept MP4 files.");
        return;
    }
    if (file.size>500000000){
        fs.unlink(file.path, function(err) {
            if (err) throw err;
            console.log('successfully deleted '+file.path);
        });
        res.send("We're sorry. File size cannot exceed 500 MB.");
        return;
    }
    
    fs.rename('./'+file.path, './public/uploads/'+file.name, function (err) {
        if (err) throw err;
        console.log('rename completed');
    });
    
    res.redirect('/v/'+file.name.split('.')[0]);
    
});

app.listen(3001);
console.log('running server on 3001');
