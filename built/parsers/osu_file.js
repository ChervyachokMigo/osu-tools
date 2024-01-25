"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.osu_file = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const buffer_parse_1 = require("../tools/buffer_parse");
const osu_file_type_1 = require("../consts/osu_file_type");
const mmap_io_1 = __importDefault(require("@raygun-nickj/mmap-io"));
class osu_file {
    constructor(file_path, property_settings) {
        this.file_type = osu_file_type_1.osu_file_type.none;
        this.file_path = file_path;
        this.file_basename = path.basename(file_path);
        if (!this.set_type()) {
            throw new Error('wrong file type. It not osu file');
        }
        if (typeof property_settings === 'undefined') {
            this.property_settings = [];
        }
        else {
            this.property_settings = property_settings;
        }
        try {
            this.file_handle = fs.openSync(file_path, 'r');
            let fstats = fs.fstatSync(this.file_handle);
            this.file_size = fstats.size;
            this.file_buffer = mmap_io_1.default.map(this.file_size, mmap_io_1.default.PROT_READ, mmap_io_1.default.MAP_PRIVATE, this.file_handle, 0, mmap_io_1.default.MADV_NORMAL);
            this.buff = new buffer_parse_1.buffer_parse(this.file_handle, this.file_buffer);
        }
        catch (error) {
            console.log(error);
            throw new Error('can not open osu file');
        }
    }
    free() {
        return mmap_io_1.default.incore(this.file_buffer);
    }
    close() {
        return fs.closeSync(this.file_handle);
    }
    get_type() {
        return this.file_type;
    }
    set_type() {
        if (path.extname(this.file_basename) === '.db') {
            if (this.file_basename.startsWith(osu_file_type_1.osu_file_type.osu_db)) {
                this.file_type = osu_file_type_1.osu_file_type.osu_db;
            }
            else {
                switch (this.file_basename) {
                    case osu_file_type_1.osu_file_type.collection_db:
                        this.file_type = osu_file_type_1.osu_file_type.collection_db;
                        break;
                    case osu_file_type_1.osu_file_type.scores_db:
                        this.file_type = osu_file_type_1.osu_file_type.scores_db;
                        break;
                }
            }
            if (this.file_type === osu_file_type_1.osu_file_type.none) {
                return false;
            }
            return true;
        }
        else {
            if (path.extname(this.file_basename) === '.osr') {
                this.file_type = osu_file_type_1.osu_file_type.replay_osr;
                return true;
            }
        }
        return false;
    }
    set_property_settings(property_settings) {
        if (property_settings && property_settings.length > 0) {
            this.property_settings = property_settings;
        }
        else {
            throw new Error('wrong parse settings');
        }
    }
}
exports.osu_file = osu_file;
