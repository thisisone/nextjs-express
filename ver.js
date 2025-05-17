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
  ".\\src\\ver.ts",
  `
export const VERSION=${v};
export const BUILD_DATE='${build_date}';
`.trim()
);

// http://localhost:3000/api/ver_up/next_express/26
const url = "https://sid123.tplinkdns.com/api/ver_up/next_express/" + v;
console.log("fetch_verup url", url);
fetch(url, {
  method: "GET",
})
  .then(async (res2) => {
    const json = await res2.json();
    console.log("fetch_verup ok", json);
    process.exit(0);
  })
  .catch((e) => {
    console.log("fetch_verup fail", e);
    process.exit(2);
  });
