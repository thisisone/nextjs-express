const express = require("express");
const { set_root_dir, proc_all_file } = require("./build/src/express");
set_root_dir(__dirname);

const app = express();

app.get("/", proc_all_file);
app.get("/style.css", proc_all_file);
app.get("/favicon.ico", proc_all_file);
app.get("/web*", proc_all_file);

app.get("/api**", (req, res) => {
  console.log("get /abc", req.url);
  res.send("ok");
});

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
  console.log("http://localhost:3000/webgl_mp/index.html");
});

module.exports = app;
