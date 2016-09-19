"use strict";

import fs from "fs";
import cheerio from "cheerio";

/*eslint-disable no-console*/

fs.readFile("src/index.html", "utf8", (error, markup) => {
    if (error) return console.log(error);

    const $ = cheerio.load(markup);

    //since a separate spreadsheet is only utilized for the production build, need

    $("head").prepend("<link rel='stylesheet' href='style.css'>");

    fs.writeFile("dist/index.html", $.html(), "utf8", function (error) {
        if (error) return console.log(error);
        console.log("index.html written to /dist".green);
    });
});

