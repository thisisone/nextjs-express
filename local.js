// local.js
// 로컬에서 테스트할때 쓴다.
const app = require("./server");
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

console.log("local server start");
