const express = require("express");
const path = require("path");
const fs = require("fs");

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

app.get("/webgl/**", (req, res) => {
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

  // webgl 뒷부분을 읽어 파일 경로를 많음
  var fpath = "";
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] != "webgl") continue;

    for (; i < arr.length; i++) {
      fpath = path.join(fpath, arr[i]);
    }
    break;
  }

  // 절대 경로 만들기기
  fpath = path.join(__dirname, "public", fpath);
  if (comp) {
    console.log("send gz", ctype, url);
  }

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

let count = 0;
app.get("/", (_, res) => {
  count++;
  res.send(
    `
<html>
    <head>
    </head>
    <body>
        <h1>Unity WebGL compression demo</h1>
        <p>
            <a href="/webgl/index.html">
                View
            </a>
        </p>
        <p>
            visit counter ${count}
        </p>
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
  console.log("http://localhost:3000/api/test");
  console.log("http://localhost:3000/webgl/index.html");
});

module.exports = app;
