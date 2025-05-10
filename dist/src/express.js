"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.set_root_dir = set_root_dir;
exports.proc_dummy = proc_dummy;
exports.proc_all_file = proc_all_file;
exports.proc_all_file_old = proc_all_file_old;
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
// variable
// let IS_DEV = process.env.IS_DEV;
// const MAX_AGE = IS_DEV ? MONTH : 0;
// const MAX_AGE = 0;
// console.log("IS_DEV", IS_DEV);
// console.log("MAX_AGE", MAX_AGE);
let root_dir = __dirname;
// MIME LIST
// https://developer.mozilla.org/ko/docs/Web/HTTP/Guides/MIME_types/Common_types
const ext_type_list = {};
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
// 파일 크기 얻기
function get_file_size(fpath) {
    var stats = fs.statSync(fpath);
    return stats.size;
}
// ts 랑 js 가 폴더구조가 달라서 통일시켜야한다.
function set_root_dir(dir) {
    root_dir = dir;
    console.log("root_dir", root_dir);
}
// / 나 \\ 전부 지원하는 분리기
function path_split(text) {
    var arr = [];
    var s = "";
    for (var i = 0; i < text.length; i++) {
        var c = text[i];
        if (c == "/" || c == "\\") {
            if (arr.length == 0 && s == "") {
                // 처음에 빈게 나오면 무시
            }
            else {
                arr.push(s);
            }
            s = "";
        }
        else {
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
function get_ext(text) {
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
function get_ext_before_comp(url, comp) {
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
// 테스트용 호출
function proc_dummy(req, res) {
    console.log("GET", req.url);
    res.send(req.url);
}
//
function proc_all_file(req, res) {
    // console.info("GET start", req.url);
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
            root_dir, "public", "index.html");
        }
        else {
            const arr = path_split(target_path);
            target_path = path.join(
            //
            root_dir, "public", ...arr);
        }
        ext = get_ext(url);
        comp = "";
        if (ext == ".br") {
            comp = "br";
            ext = get_ext_before_comp(url, ext);
        }
        else if (ext == ".gz") {
            comp = "gzip";
            ext = get_ext_before_comp(url, ext);
        }
        var content_type = "";
        var lower = ext.toLowerCase();
        if (ext_type_list[lower] !== undefined) {
            content_type = ext_type_list[lower];
        }
        let fsize = "";
        try {
            var size = get_file_size(target_path);
            fsize = "OK_" + size;
        }
        catch (err2) {
            const e = err2;
            fsize = "NG_" + e.message;
        }
        // fs.createReadStream(target_path).pipe(res);
        res.send(`ok, __dirname=${__dirname}, root_dir=${root_dir}, target_path=${target_path}, comp=${comp}, ext=${ext}, content_type=${content_type}, fsize=${fsize}`);
    }
    catch (err) {
        const e = err;
        res.send(`ng, ${e.message}`);
    }
}
// public 파일을 단순 전달하는 방법
// 이걸로는 unity webgl 압축을 사용할 수 없다.
// app.use(express.static("public"));
//
// http://localhost:3002/webgl_mp/index.html
//
function proc_all_file_old(req, res) {
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
            root_dir, "public", "index.html");
        }
        else {
            const arr = path_split(target_path);
            target_path = path.join(
            //
            root_dir, "public", ...arr);
            // throw Error("test");
        }
        console.log("target_path", target_path);
        ext = get_ext(url);
        comp = "";
        if (ext == ".br") {
            comp = "br";
            ext = get_ext_before_comp(url, ext);
        }
        else if (ext == ".gz") {
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
    }
    catch (err) {
        const e = err;
        console.error(
        //
        "[E] GET " + req.url + " fail", target_path, comp, ext, e.message, e.stack);
        res.status(500);
        res.send("GET " + req.url + " fail");
    }
}
