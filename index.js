#! /usr/bin/env node
'use strict';
let express = require('express');
let assets = require('connect-assets');

let prod = process.env.NODE_ENV === 'production';
let app = express();
let assetConfig = {
  paths: [
    'node_modules',
    'game/css',
    'game/js',
    // 'assets/img',
  ],
  buildDir: prod && '.built-assets',
};

// TODO static files
// TODO connect-assets

app.use(assets(assetConfig));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  return res.render('game');
});

let port = process.env.PORT || 8000;;
app.listen(port, () => {
  console.log('Listening on port %s...', port);  
});
