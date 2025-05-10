const express = require("express");
// const { set_root_dir, proc_all_file } = require("./dist/src/express");
// set_root_dir(__dirname);

const app = express();

let count = 0;
// app.get("/", (req, res) => {
//   console.log("GET /", req.url);
//   res.send("ok, " + count++);
// });
app.get("/", proc_all_file);
app.get("/style.css", proc_all_file);
app.get("/favicon.ico", proc_all_file);
app.get("/favicon.png", proc_all_file);
// app.get("/webgl*", proc_all_file);

// app.get("/api/**", (req, res) => {
//   console.log("get /abc", req.url);
//   res.send("ok");
// });

// 서버 시작
let PORT = 3000;
if (process.env.PORT) {
  PORT = parseInt(process.env.PORT);
}
console.log("PORT", PORT);

app.listen(PORT, () => {
  console.log("express listen");
  console.log(`http://localhost:${PORT}/`);
  console.log(`https://unity.sidnft.com`);
  console.log(`https://unity.sidnft.com/webgl_mp/index.html`);
});

module.exports = app;
