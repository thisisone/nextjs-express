const { app, set_root_dir } = require("./build/src/express");
set_root_dir(__dirname);
module.exports = app;
