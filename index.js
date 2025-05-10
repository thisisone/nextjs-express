const express = require("express");
const { init_app } = require("./dist/src/express");

const app = express();
init_app(app);

// 서버 시작
let PORT = 3000;
if (process.env.PORT) {
  PORT = parseInt(process.env.PORT);
}
// console.log("PORT", PORT);

app.listen(PORT, () => {
  console.log("express listen");
  console.log(`http://localhost:${PORT}/`);
  console.log(`https://unity.sidnft.com`);
  console.log(`https://unity.sidnft.com/webgl_mp/index.html`);
});

module.exports = app;
