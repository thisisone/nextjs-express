const { app, set_root_dir } = require("./src/express");

// console.log("app", app);
// console.log("set_root_dir", set_root_dir);

set_root_dir(__dirname);
module.exports = app;
