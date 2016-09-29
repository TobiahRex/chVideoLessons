import express from 'express';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
if (!process.env.PORT || !process.env.MONGOURL) require('dotenv').load();

const PORT = process.env.PORT || 3000;
const app = express();
const MONGOURL = process.env.MONGODB_URI || "mongodb://localhost/chVideoLessons";
const compiler = webpack(config);

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.static(__dirname));
app.use((req, res, next) => {
  res.handle = (err, dbData) => res.status(err ? 400 : 200).send(err || dbData);
  next();
});
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    hot: true,
    //pass public path defined in public.config
    publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));
app.use("/api", require("./api/api"));
app.use("*", require("./api/index"));

app.listen(PORT, (err) => console.info(err || `Listening on port ${PORT}`));
mongoose.connect(MONGOURL, (error) => console.info(error || `Connected to MongoDB at ${MONGOURL}`));
