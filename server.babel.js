import path from 'path';
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import routes from './src/routes';
import { renderHTMLString } from '@sketchpixy/rubix/lib/node/router';
import RubixAssetMiddleware from '@sketchpixy/rubix/lib/node/RubixAssetMiddleware';

import mongoose from 'mongoose';
// import autoIncrement from 'mongoose-auto-increment';
//controllers
import groupController from './src/controllers/groupsController';
import peopleController from './src/controllers/peopleController';
import checkinController from './src/controllers/checkinController';


var Papa = require('babyparse');
var fs = require('fs');
var file = './documents/text.csv';

const port = process.env.PORT || 9090;



let app = express();


//cross domain problems
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json())
app.use(express.static(path.join(process.cwd(), 'public')));
app.use("/api", groupController);
app.use("/api", peopleController);
app.use("/api", checkinController);
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'pug');


app.get('/api/csv2json',(req, res)=>{
  var content = fs.readFileSync(file, { encoding: 'utf8' });
  var arr = Papa.parse(content,{
	header: true
}).data;

  res.json(array2json(arr));

});

function array2json(arr){
  var json = [];
  arr.forEach(function(obj){
    var eachJson = {};
    var gpJson = {};
    Object.keys(obj).forEach(function(key) {

      if(key == 'group' || key == 'unit'){
        gpJson[key] = obj[key];
      }else{
        eachJson[key] = obj[key];
      }
    });
    eachJson.group = gpJson;
    json.push(eachJson);
  });

  return json;
}

function renderHTML(req, res) {
  renderHTMLString(routes, req, (error, redirectLocation, html) => {
    if (error) {
      if (error.message === 'Not found') {
        res.status(404).send(error.message);
      } else {
        res.status(500).send(error.message);
      }
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else {
      res.render('index', {
        content: html
      });
    }
  });
}

app.get('*', RubixAssetMiddleware('ltr'), (req, res, next) => {
  renderHTML(req, res);
});

app.listen(port, () => {
  console.log(`Node.js app is running at http://localhost:${port}/`);
});


// Connect to our mongo database
mongoose.connect('mongodb://localhost:27017/wensu');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Database Connected.");
});
