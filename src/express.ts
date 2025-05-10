import { Request, Response } from "express";
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

// type

interface MAP_KV {
  [key: string]: string;
}

// variable

// let IS_DEV = process.env.IS_DEV;
// const MAX_AGE = IS_DEV ? MONTH : 0;
// const MAX_AGE = 0;
// console.log("IS_DEV", IS_DEV);
// console.log("MAX_AGE", MAX_AGE);

let root_dir = __dirname;

// MIME LIST
// https://developer.mozilla.org/ko/docs/Web/HTTP/Guides/MIME_types/Common_types
const ext_type_list: MAP_KV = {};
ext_type_list[".html"] = "text/html";
ext_type_list[".ico"] = "image/vnd.microsoft.icon";
ext_type_list[".png"] = "image/png";
ext_type_list[".jpg"] = "image/jpeg";
ext_type_list[".gif"] = "image/gif";
ext_type_list[".css"] = "style/css";
ext_type_list[".json"] = "application/json";
ext_type_list[".wasm"] = "application/wasm";
ext_type_list[".js"] = "application/javascript";
// ext_type_list[".data"] = "application/octet-stream";

// export const app = express();

//
// 함수들
//

// ts 랑 js 가 폴더구조가 달라서 통일시켜야한다.
export function set_root_dir(dir: string) {
  root_dir = dir;
  console.log("root_dir", root_dir);
}

// / 나 \\ 전부 지원하는 분리기
function path_split(text: string) {
  var arr = [];
  var s = "";
  for (var i = 0; i < text.length; i++) {
    var c = text[i];
    if (c == "/" || c == "\\") {
      if (arr.length == 0 && s == "") {
        // 처음에 빈게 나오면 무시
      } else {
        arr.push(s);
      }

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

// 확장자 명만 뽑는다.
// input: abc.def.gz?date
// return: ".gz";
function get_ext(text: string) {
  var pos = text.indexOf("?");
  if (pos >= 0) {
    text = text.substring(0, pos);
    // console.log("found ?", text);
  }

  var pos = text.lastIndexOf(".");
  if (pos >= 0) {
    var ext = text.substring(pos);
    // console.log("found .", text);
    return ext;
  }

  return "";
}

// 압축 이전의 파일 확장자를 구한다.
// /abc.js.gz -> .js
function get_ext_before_comp(url: string, comp: string) {
  var text = url;
  var pos = url.indexOf(comp);
  if (pos < 0) {
    console.error("get_ext_before_comp fail", url, comp);
    return "";
  }

  var text = text.substring(0, pos);
  pos = text.lastIndexOf(".");
  if (pos < 0) {
    console.error("get_ext_before_comp fail-2", url, comp);
    return "";
  }

  return text.substring(pos);
}

//
// express
//

// public 파일을 단순 전달하는 방법
// 이걸로는 unity webgl 압축을 사용할 수 없다.
// app.use(express.static("public"));
//
// http://localhost:3002/webgl_mp/index.html
//
export function proc_all_file(req: Request, res: Response) {
  console.info("GET start", req.url);

  let target_path = "";
  let comp = "";
  let ext = "";

  try {
    var url = req.url;
    target_path = req.url;

    if (target_path == "/") {
      url = "/index.html";
      target_path = path.join(
        //
        root_dir,
        "public",
        "index.html"
      );
    } else {
      const arr = path_split(target_path);
      target_path = path.join(
        //
        root_dir,
        "public",
        ...arr
      );
      // throw Error("test");
    }
    console.log("target_path", target_path);

    ext = get_ext(url);
    comp = "";
    if (ext == ".br") {
      comp = "br";
      ext = get_ext_before_comp(url, ext);
    } else if (ext == ".gz") {
      comp = "gzip";
      ext = get_ext_before_comp(url, ext);
    }

    var content_type = "";
    var lower = ext.toLowerCase();
    if (ext_type_list[lower] !== undefined) {
      content_type = ext_type_list[lower];
    }

    // 전송 가능
    if (content_type != "") {
      res.setHeader("Content-Type", content_type);
    }

    if (comp != "") {
      res.setHeader("Content-Encoding", comp);
    }

    // 바이너리 전송은 이 방식으로 해야한다.
    fs.createReadStream(target_path).pipe(res);

    // console.log("OK", target_path, content_type, comp);
  } catch (err) {
    const e = err as Error;
    console.error(
      //
      "[E] GET " + req.url + " fail",
      target_path,
      comp,
      ext,
      e.message,
      e.stack
    );

    res.status(500);
    res.send("GET " + req.url + " fail");
  }
}
