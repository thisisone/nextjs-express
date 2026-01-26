"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const express_2 = require("./src/express");
exports.app = (0, express_1.default)();
(0, express_2.init_app)(exports.app);
// 서버 시작
let PORT = 3000;
if (process.env.PORT) {
    PORT = parseInt(process.env.PORT);
}
// console.log("PORT", PORT);
exports.app.listen(PORT, () => {
    console.log("express listen");
    console.log(`http://localhost:${PORT}/`);
    // console.log(`http://localhost:${PORT}/webgl_mp/index.html`);
});
console.log("dev");
