"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.raw_file = void 0;
const fs_1 = require("fs");
const path = __importStar(require("path"));
const buffer_parse_1 = require("../tools/buffer_parse");
class raw_file {
    constructor(file_path) {
        this.file_path = file_path;
        this.file_basename = path.basename(file_path);
        try {
            const fd = (0, fs_1.openSync)(file_path, 'r');
            const fstats = (0, fs_1.fstatSync)(fd);
            (0, fs_1.closeSync)(fd);
            this.file_size = fstats.size;
            this.file_buffer = (0, fs_1.readFileSync)(file_path);
            this.buff = new buffer_parse_1.buffer_parse(this.file_buffer);
        }
        catch (error) {
            console.log(error);
            throw new Error('can not open file');
        }
    }
}
exports.raw_file = raw_file;
