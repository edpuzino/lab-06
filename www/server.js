'use strict';

const superagent = require('superagent');
const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;
const API = process.env.API_URL || 'http://localhost:3000';

// EJS is our template engine
app.set('view engine', 'ejs');

// Set up public folder
app.use( express.static('./public') );

app.get('/', index);
app.get('/', categories);
app.get('/', products);

function index(request,response) {
  response.render('site', {page:'./pages/index', title: 'Our Store: Home Page'});
}

function categories(request,response) {
  superagent.get(`${API}/categories`).then( data => {
    response.render('site', {categories:data.body, page:'./pages/categories', title:'Our Store: Categories'});
  }).catch( error => console.error(error) );  
}

function products(request,response) {
  superagent.get(`${API}/products`).then( data => {
    response.render('site', {products:data.body, page:'./pages/products', title:'Our Store: Products'});
  }).catch( error => console.error(error) );  
}

app.listen(PORT, () => console.log('Server up on ${PORT}') );