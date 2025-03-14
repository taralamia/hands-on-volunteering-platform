/*
* Title: HandsOn – A Community-Driven Social Volunteering  Platform 
* Description: HandsOn is a community-driven social volunteering platform that connects individuals with meaningful social impact opportunities.
* Author: Tabassum Tara Lamia
* Date: 08/03/2025
*/
//external imports

const mongoose = require('mongoose');
const http = require('http');
const dotenv = require('dotenv');
const path = require("path");
const cookieParser = require("cookie-parser");
const moment = require("moment");
const express = require('express');
const authRouter = require("./router/authRouter");
const cors = require('cors');

// internal imports

const {notFoundHandler,errorHandler} = require("./middlewares/common/errorHandler");

const app = express();
dotenv.config();

//database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING,{
    useNewUrlParser : true,
useUnifiedTopology: true
})
.then(() => console.log("Database Connection Successful!"))
.catch(err => console.log(err));

//request parsers
app.use(express.json());
app.use(express.urlencoded({extended : true})); //=> for views

// Enable CORS for the frontend URL and credentials (cookies)
app.use(
    cors({
      origin: "http://localhost:3000", // The frontend URL
      methods: ["GET", "POST","PUT","DELETE"],
      credentials: true, // Allow cookies to be sent and received
    })
  );

app.use((req, res, next) => {
    console.log(" Request received!");
    console.log(" Method:", req.method);
    console.log(" Path:", req.path);
    console.log(" Body:", req.body);
    console.log(" Query Params:", req.query);
    console.log("---------------------------");
    next();
}); // for debugging purpose

//set view engine
//here's the view code


// set static folder (public folder)
app.use(express.static(path.join(__dirname,"public")));

//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));
// routing setup
app.use('/auth',authRouter);


//404 not found handling
app.use(notFoundHandler);

//common error handler
app.use(errorHandler);

app.listen(process.env.PORT,()=>{
    console.log(`app listening to port ${process.env.PORT}`);
});
