const express = require("express");
const path = require("path");
const fs = require("fs");

// 1 month
const MONTH = 60 * 60 * 24 * 30;
// const MAX_AGE = MONTH;
const MAX_AGE = 1;
const app = express();

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

app.get("/webgl**", (req, res) => {
  var url = req.url;

  var comp_gz = false;
  var comp_br = false;
  if (comp_last(url, ".gz")) {
    comp_gz = true;
  } else if (comp_last(url, ".br")) {
    comp_br = true;
  }

  var ctype = null;
  if (
    comp_last(url, ".wasm") || //
    comp_last(url, ".wasm.gz") ||
    comp_last(url, ".wasm.br")
  ) {
    ctype = "application/wasm";
  } else if (
    comp_last(url, ".js") ||
    comp_last(url, ".js.gz") ||
    comp_last(url, ".js.br")
  ) {
    ctype = "application/javascript";
  } else if (
    comp_last(url, ".data") ||
    comp_last(url, ".data.gz") ||
    comp_last(url, ".data.br")
  ) {
    // ctype = "application/data";
    ctype = null;
  }

  var arr = path_split(url);
  // console.log("arr", arr);

  // webgl 뒷부분을 읽어 파일 경로를 많음
  var fpath = "";
  for (var i = 0; i < arr.length; i++) {
    // if (arr[i] != "webgl") continue;

    for (; i < arr.length; i++) {
      fpath = path.join(fpath, arr[i]);
    }
    break;
  }

  // 절대 경로 만들기기
  fpath = path.join(__dirname, "public", fpath);
  if (comp_gz) {
    res.setHeader("Content-Encoding", "gzip");
    // res.set("Cache-Control", "public, max-age=" + MAX_AGE);
  } else if (comp_br) {
    res.setHeader("Content-Encoding", "br");
    // res.set("Cache-Control", "public, max-age=" + MAX_AGE);
  }

  if (ctype !== null) {
    res.setHeader("Content-Type", ctype);
  }

  // 로그 출력
  if (comp_gz || comp_br) {
    console.log("=====");
    console.log("webgl req url", url);
    if (comp_br) console.log("comp_br");
    if (comp_gz) console.log("comp_gz");
    console.log("ctype", ctype);
    console.log("fpath", fpath);

    var fsize = getFilesizeInBytes(fpath);
    if (fsize < 1024) {
      console.log("fsize", fsize, "bytes");
    } else if (fsize < 1024) {
      const size = Math.ceil(fsize / 1024);
      console.log("fsize", size, "KB");
    } else {
      const size = Math.ceil(fsize / (1024 * 1024));
      console.log("fsize", size, "MB");
    }
  }

  fs.createReadStream(fpath).pipe(res);
});

// 파일 크기 얻기
function getFilesizeInBytes(filename) {
  var stats = fs.statSync(filename);
  return stats.size;
}

let count = 0;
app.get("/", (_, res) => {
  count++;
  res.send(
    `
<html>
    <head>
    </head>
    <body>
      <main>
          <h1>street for promotion v3</h1>
          <p>
              <a href="/webgl_3_2/index.html">
                  View
              </a>
          </p>
          <p>
              visit counter ${count}
          </p>
        </main>
    </body>
</html>
    `
  );
});
app.get("/api/**", (req, res) => {
  count++;
  res.send("api=" + count + " url=" + req.url);
});

// public 파일을 단순 전달하는 방법
// 이걸로는 unity webgl 압축을 사용할 수 없다.
// app.use(express.static("public"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log("express listen");
  console.log("http://localhost:3000/");
  console.log("http://192.168.0.24:3000/");
});

module.exports = app;

/*

http://192.168.0.24:3000/webgl_3/Build/z_web.framework.js.br

http://192.168.0.24:3000
/webgl_3
/Build
/z_web.framework.js.br

http://192.168.0.24:3000/webgl_3_2/Build/z_web.data.br


http://192.168.0.24:3000/webgl_3_2/Build/z_web.data.br

http://unity.sidnft.com/webgl_3/Build/z_web.data.br

*/
