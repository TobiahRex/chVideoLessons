"use strict";

import express from 'express';
import path from 'path';
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

/* eslint-disable no-console */

const app = express();
const PORT = process.env.PORT || 4000;
const MONGOURL = process.env.MONGODB_URI || "mongodb://localhost/example";

mongoose.connect(MONGOURL, function (error) {
    console.log(error || `Connected to MongoDB at ${MONGOURL}`);
});

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());
app.use(express.static("dist"));


app.use("/api", require("./routes/api"));

app.use("*", function(request, response) {
    response.sendFile(path.join(__dirname, "../dist/index.html"));
});


app.listen(PORT, function(err) {
    console.log(err || `Listening on port ${PORT}`);
});