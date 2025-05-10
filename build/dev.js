"use strict";
const { app, set_root_dir } = require("./src/express");
set_root_dir(__dirname);
module.exports = app;
