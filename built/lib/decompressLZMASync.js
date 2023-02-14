"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compressLZMASync = exports.compressAsync = exports.decompressLZMASync = exports.decompressAsync = void 0;
const { loopWhile } = require('deasync');
const lzma_worker_1 = __importDefault(require("./lzma_worker"));
function decompressAsync(buffer, on_finish) {
    return __awaiter(this, void 0, void 0, function* () {
        var finish_result = '';
        yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            lzma_worker_1.default.decompress(buffer, decompress_finish);
            function decompress_finish(result, error) {
                if (error) {
                    console.error(error);
                    reject('can not decode string');
                }
                resolve(result);
            }
        })).then(value => {
            finish_result = typeof value === 'string' ? value : '';
        }).catch(error => {
            throw new Error(error);
        });
        on_finish(finish_result);
    });
}
exports.decompressAsync = decompressAsync;
const decompressLZMASync = function (buffer) {
    var done = false;
    var data = '';
    decompressAsync(buffer, function cb(result) {
        data = result;
        done = true;
    });
    loopWhile(function () { return !done; });
    return data;
};
exports.decompressLZMASync = decompressLZMASync;
//{s: number, f: number, m: number}
function compressAsync(str, mode, on_finish) {
    return __awaiter(this, void 0, void 0, function* () {
        var finish_result;
        yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            lzma_worker_1.default.compress(str, mode, (result, error) => {
                if (error) {
                    console.error(error);
                    reject('can not decode string');
                }
                resolve(result);
            });
        })).then(value => {
            finish_result = value;
        }).catch(error => {
            throw new Error(error);
        });
        on_finish(finish_result);
    });
}
exports.compressAsync = compressAsync;
const compressLZMASync = function (str, mode) {
    var done = false;
    var data = Buffer.alloc(0);
    compressAsync(str, mode, function cb(result) {
        data = result;
        done = true;
    });
    loopWhile(function () { return !done; });
    return data;
};
exports.compressLZMASync = compressLZMASync;
