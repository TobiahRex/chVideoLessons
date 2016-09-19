"use strict";

import express from 'express';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import path from "path";

const PORT = process.env.PORT || 3000;
const app = express();
const MONGOURL = process.env.MONGODB_URI || "mongodb://localhost/chVideoLessons";
const compiler = webpack(config);
// const pathToStatic = path.join(__dirname);
/* eslint-disable no-console */


mongoose.connect(MONGOURL, function (error) {
    console.log(error || `Connected to MongoDB at ${MONGOURL}`);
});


app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));


app.use(express.static(__dirname));



app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    //pass public path defined in public.config
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use("/api", require("./routes/api"));

app.use("*", require("./routes/index"));


app.listen(PORT, function(err) {
    console.log(err || `Listening on port ${PORT}`);
});
