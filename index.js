const express = require("./build/src/express");

express.set_root_dir(__dirname);

module.exports = express.app;
