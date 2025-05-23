const express = require("express");
const {
  proc_all_file,
  proc_dummy,
} = require("./dist/src/express");

const app = express();

// let count = 0;
// app.get("/", (req, res) => {
//   console.log("GET /", req.url);
//   res.send("ok, " + count++);
// });
app.get("/", proc_dummy);
app.get("/style.css", proc_dummy);
app.get("/favicon.ico", proc_dummy);
app.get("/favicon.png", proc_dummy);
app.get("/webgl*", proc_all_file);

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
