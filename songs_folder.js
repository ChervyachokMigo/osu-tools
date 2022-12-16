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
exports.getFiles = void 0;
const fs = __importStar(require("fs"));
/**
 * Returns folders of folder
 * @param path - path to read files
 * @returns Folder - (path: string, files: Array of Dirent, count: number of files)
 */
function getFiles(path) {
    var result = { path: path, files: [], count: 0 };
    try {
        result.files = fs.readdirSync(path, { encoding: 'utf-8', withFileTypes: true });
        result.files = result.files.filter(val => val.isDirectory());
        result.count = result.files.length;
    }
    catch (er) {
        console.log('Error: can not read the folder', path);
    }
    return result;
}
exports.getFiles = getFiles;
