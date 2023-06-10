"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.absoluteUrl = exports.formatDate = exports.cn = void 0;
var clsx_1 = require("clsx");
var tailwind_merge_1 = require("tailwind-merge");
function cn() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
exports.cn = cn;
function formatDate(input) {
    var date = new Date(input);
    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}
exports.formatDate = formatDate;
function absoluteUrl(path) {
    return "".concat(process.env.NEXT_PUBLIC_APP_URL).concat(path);
}
exports.absoluteUrl = absoluteUrl;
