"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escape_string = void 0;
const escape_string = (text) => {
    return text ? text.replace(/[&\/\\#+$~%'":*?<>{}|]/g, '') : '';
};
exports.escape_string = escape_string;
