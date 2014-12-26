var express = require('express');
var browserify = require('browserify-middleware');
var exposify = require('exposify');

exposify.config = {react: 'React', 'react/addons': 'React'};

var app = express();

browserify.settings({
  transform: [
    ['reactify', {es6: true, sourceMaps: true}],
    [exposify, {global:true}]
  ]
});

browserify.settings.development({
  cache: 'dynamic',
  gzip: true,
  precompile: true
});

app.all('/', function(req, res) {
  res.sendFile('./index.html', {root: __dirname});
});

app.get('/example.js', browserify('./example.js'));

app.listen(3000);
