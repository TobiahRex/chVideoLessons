"use strict";


/*eslint-disable no-console*/

import webpack from "webpack";
import webpackConfig from "../webpack.config.prod";
import colors from "colors";

process.env.NODE_ENV = "production"; // this assures the Babel dev config (for hot reloading) doesn't apply.

console.log("Generating minified bundle for production via webpack");

webpack(webpackConfig).run((error, stats) => {

    if (error) {
        console.log(error.bold.red);
        return 1;
    }

    const jsonStats = stats.toJson();

    if (jsonStats.hasErrors) {
        return jsonStats.errors.map(error => console.log(error.red));
    }

    if (jsonStats.hasWarnings) {
        console.log("Webpack generated the following warnings: ".bold.yellow);
        jsonStats.warnings.map(warning => console.log(warning.yellow));
    }

    console.log(`Webpack stats: ${stats}`);

    //build succeeds if gotten this far
    console.log("App has been compiled in production mode.".green);

    return 0;
});