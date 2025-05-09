const fs = require("fs");
const moment = require("moment");

var data = fs.readFileSync(".ver", "utf-8");

var build_date = moment().format("YYYY-MM-DD HH:mm:ss");
var v = parseInt(data);
v++;
console.log("read .ver=", v);
console.log("build_date=", build_date);

fs.writeFileSync(".ver", `${v}`);
fs.writeFileSync(
  ".\\public\\ver.mjs",
  `
export const VERSION=${v};
export const BUILD_DATE='${build_date}';
`.trim()
);
