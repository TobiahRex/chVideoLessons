import express from 'express';
import path from 'path';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
/* eslint-disable no-console */
const app = express();
const PORT = process.env.PORT || 4000;
const MONGOURL = process.env.MONGODB_URI || 'mongodb://localhost/example';
if (!process.env.PORT || !process.env.MONGOURL) require('dotenv').load();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());
app.use(express.static('dist'));
app.use((req, res, next) => {
  res.handle = (err, dbData) => res.status(err ? 400 : 200).send(err || dbData);
  next();
});
app.use('/api', require('./routes/api'));
app.use('*', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')));

mongoose.connect(MONGOURL, (error) => console.info(error || `MongoDB @ ${MONGOURL}`));
app.listen(PORT, (err) => console.info(err || `Server @ ${PORT}`));
