"use strict";
const { app, set_root_dir, proc_all_file } = require("./src/express");
set_root_dir(__dirname);
app.get("/api", (req, res) => {
    console.log("get /abc", req.url);
    res.send("ok");
});
app.get("/**", proc_all_file);
// 서버 시작
let PORT = 3000;
if (process.env.PORT) {
    PORT = parseInt(process.env.PORT);
}
console.log("PORT", PORT);
app.listen(PORT, () => {
    console.log("express listen");
    console.log(`http://localhost:${PORT}/`);
    console.log(`http://localhost:${PORT}/api`);
});
module.exports = app;
