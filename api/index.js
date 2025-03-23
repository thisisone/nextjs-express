const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// 마지막이 cond 랑 같은지 비교
function comp_last(text, cond) {
  if (text.length < cond.length) return false;

  var sub = text.substring(text.length - cond.length);
  //   console.log(text, cond, sub);

  return sub == cond;
}

// / 나 \\ 전부 지원하는 분리기기
function path_split(text) {
  var arr = [];
  var s = "";
  for (var i = 0; i < text.length; i++) {
    var c = text[i];
    if (c == "/" || c == "\\") {
      arr.push(s);
      s = "";
    } else {
      s += c;
    }
  }

  if (s.length > 0) {
    arr.push(s);
  }

  return arr;
}

// http://localhost:3000/z_web/index.html
app.get("/z_web/**", (req, res) => {
  var url = req.url;
  // console.log("url", url);

  var comp = false;
  if (comp_last(url, ".gz")) {
    comp = true;
  }

  var ctype = null;
  if (
    comp_last(url, ".wasm") || //
    comp_last(url, ".wasm.gz")
  ) {
    ctype = "application/wasm";
  } else if (
    comp_last(url, ".js") || //
    comp_last(url, ".js.gz")
  ) {
    ctype = "application/javascript";
  }

  var arr = path_split(url);
  // console.log("arr", arr);

  // z_web 뒷부분을 읽어 파일 경로를 많음
  var fpath = "";
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] != "z_web") continue;

    for (; i < arr.length; i++) {
      fpath = path.join(fpath, arr[i]);
    }
    break;
  }

  // 절대 경로 만들기기
  fpath = path.join(__dirname, "public", fpath);
  console.log("file", comp, ctype, url);

  if (comp) {
    res.setHeader("Content-Encoding", "gzip");
  }

  if (ctype !== null) {
    res.setHeader("Content-Type", ctype);
  }

  // // 실패, 캐싱하려고 직점 일기
  // fs.readFile(fpath, "utf8", function (err, data) {
  //   if (err) {
  //     console.log("fail", fpath);
  //     throw err;
  //   }

  //   res.write(data);
  //   res.end();
  //   // console.log("fpath", fpath, data.length);
  // });

  // edge 에서 오류남
  // res.sendFile(fpath);

  // edge 에서도 잘됨
  fs.createReadStream(fpath).pipe(res);
});

// http://localhost:3000/z_web/index.html

// public 파일을 직업 전달
// app.use(express.static("public"));

// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`);
// });

module.exports = app;
