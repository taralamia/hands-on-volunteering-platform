/*
* Title: HandsOn – A Community-Driven Social Volunteering  Platform 
* Description: HandsOn is a community-driven social volunteering platform that connects individuals with meaningful social impact opportunities.
* Author: Tabassum Tara Lamia
* Date: 08/03/2025
*/
//external imports

const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./router/authRouter');
const eventRouter = require('./router/eventRouter');
const { notFoundHandler, errorHandler } = require('./middlewares/common/errorHandler');

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database Connection Successful!"))
  .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5174", methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use('/auth', authRouter);
app.use('/event',eventRouter);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}`));