const express = require("express");
const path = require("path");
const fs = require("fs");

// 1 month
const MONTH = 60 * 60 * 24 * 30;
const MAX_AGE = MONTH;
// const MAX_AGE = 1;

let count = 0;

//
// 함수들
//

// 파일 크기 얻기
function getFilesizeInBytes(filename) {
  var stats = fs.statSync(filename);
  return stats.size;
}

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

// web 처리
function proc_webgl(req, res) {
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
    // ctype = "application/javascript";
    ctype = null;
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

  // 해더 설정

  // 1. 압축 타입 설정
  const user_comp = comp_gz || comp_br;
  if (comp_gz) {
    res.setHeader("Content-Encoding", "gzip");
  } else if (comp_br) {
    res.setHeader("Content-Encoding", "br");
  }

  // 2. 파일 캐싱 유도
  if (user_comp) {
    // res.setHeader("Cache-Control", "no-cache");
    res.set("Cache-Control", "public, max-age=" + MAX_AGE);
  }

  // 3. 컨텐츠 타입 설정
  if (ctype !== null) {
    res.setHeader("Content-Type", ctype);
  }

  // 로그 출력
  if (user_comp) {
    // console.log("=====");
    // console.log("webgl req url", url);
    // if (comp_br) console.log("comp_br");
    // if (comp_gz) console.log("comp_gz");
    // console.log("ctype", ctype);
    // console.log("fpath", fpath);
    // var fsize = getFilesizeInBytes(fpath);
    // if (fsize < 1024) {
    //   console.log("fsize", fsize, "bytes");
    // } else if (fsize < 1024) {
    //   const size = Math.ceil(fsize / 1024);
    //   console.log("fsize", size, "KB");
    // } else {
    //   const size = Math.ceil(fsize / (1024 * 1024));
    //   console.log("fsize", size, "MB");
    // }
  }

  // 파일 전송
  fs.createReadStream(fpath).pipe(res);
}

//
// express
//
const app = express();

// public 파일을 단순 전달하는 방법
// 이걸로는 unity webgl 압축을 사용할 수 없다.
// app.use(express.static("public"));
app.get("/", (_, res) => {
  count++;

  try {
    var fpath = path.join(__dirname, "public", "index.html");
    var text = fs.readFileSync(fpath, "utf-8");
    res.send(text);
  } catch (e) {
    console.log("GET / fail", e.message);
    res.status(500);
    res.send("GET / fail");
  }
});

// REST apoi 테스트트
app.get("/api/**", (req, res) => {
  count++;
  res.send("api=" + count + " url=" + req.url);
});

// 유니티 압축 빌드 배포 폴더명은
// /public/webgl~~ 형식으로 이름을 지어야한다.
app.get("/webgl**", (req, res) => {
  try {
    if (req.url.indexOf(".br") > 0) {
      var a = req.header("Accept-Encoding");
      console.log("req comp", a);
    }

    proc_webgl(req, res);
    // console.log("ok", req.url);
  } catch (e) {
    console.log("get webgl fail", req.url, e.message);
    res.send(
      `
<div>
  request: ${req.url}
</div>
<div>
  error: ${e.message}
</div>
      `
    );
  }
});

// 서버 시작
const PORT = 3000;
app.listen(PORT, () => {
  console.log("express listen");
  console.log("http://localhost:3000/");
  console.log("http://192.168.0.24:3000/");
});

module.exports = app;

/*

*/
