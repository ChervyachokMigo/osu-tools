"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare_files = void 0;
const md5_file_1 = __importDefault(require("md5-file"));
const compare_files = (file_1, file_2) => {
    const md5_1 = md5_file_1.default.sync(file_1);
    const md5_2 = md5_file_1.default.sync(file_2);
    return md5_1 === md5_2;
};
exports.compare_files = compare_files;
