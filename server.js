var express = require("express")
  , stache = require('stache')
  , public = __dirname + '/public'
  , fs = require('fs')
  , mongoose = require('mongoose')
  , mongooseAuth = require('mongoose-auth')
  , models = require('./models.js');

mongoose.connect('mongodb://localhost/test');

var User = mongoose.model('User');
var Video = mongoose.model('Video');

var app = express.createServer(
    express.static(public)
  , express.bodyParser({uploadDir:'./public/uploads'})
  , express.cookieParser()
  , express.session({ secret: 'esoognom'})
  , mongooseAuth.middleware()
);

app.configure(function() {
  app.set('view engine', 'mustache');
  app.register('.mustache', stache);
});

mongooseAuth.helpExpress(app);

app.get("/", function(req, res) {
  res.render('index', {
    locals: {
      title: 'VIDEODOZER',
    }
  });
});

app.get("/v/:id", function(req, res) {
  res.render('video', {
    locals: {
      title: req.params.id,
      source: '/uploads/' + req.params.id,
      //source: '/video/myfile.mp4'
    }
  });
});

app.post('/file-upload', function(req, res, next) {
    

    res.contentType('json');

    var file = req.files.video;

    if (file.type.split('/')[1] != 'mp4'){
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

    res.redirect('/v/'+file.name);

});

// app.post('/signup', function(req, res) {
//   user = new User(req.body);
//   user.save(function(err) {
//     if (err)
//       console.log(err);
//     else
//       res.send('OK');
//   });
// });

// app.post('/login', function(req, res) {
// });

// app.get('/login', function(req, res) {
// });



app.listen(3001);
console.log('running server on 3001');
