//Referemcia de Curso
//https://www.youtube.com/watch?v=vjf774RKrLc

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const app = express();

//Realizados la llamada a jwt
const jwt = require("jsonwebtoken");

app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Midleware que habilita cors
//Cross-origin resource sharing (CORS) is a mechanism that allows restricted 
//resources on a web page to be requested from another domain outside the domain 
//from which the first resource was served.
app.use(cors());

//Middleware para realizar solicitudes API
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//ROUTES
const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);

const homeRoute = require('./routes/home');
app.use('/', homeRoute);

const categoriesRoute = require('./routes/categories');
app.use('/categories', categoriesRoute);

const userRoute = require('./routes/user');
app.use('/user', userRoute);

//Connect to Database
mongoose.connect(process.env.DB_LOCAL,
() => 
    console.log("DB localhost Connected")
);

//How to we start to the server
app.listen(3000);